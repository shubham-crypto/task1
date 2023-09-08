
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const Path=require("path");

const multer = require("multer");

const fs = require('fs');

app.use(cors());

app.use(express.urlencoded({ limit: '1000mb' , extended: true }));

app.use(express.json({ limit: '1000mb' }));
app.use(express.static("public"));

blogarr=[];

const storage=multer.diskStorage({
  destination: 'public/images',
  filename: (req,file, cb)=>{
    cb(null, file.fieldname+"_"+Date.now()+Path.extname(file.originalname))
  },
});

const upload= multer({
  storage:storage
})

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1/BI1DB");
  console.log("Connected");
  const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    profileImage: String,
    video: String
  });

  const Blog = new mongoose.model("Blog", blogSchema);

  app.post("/load", (req, res) => {
     res.send(blogarr);
  });

  app.post("/add", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'vid', maxCount: 1 }]), (req, res) => {
    const profileImage=req.files['image'][0].path.substring(7);
    const title=req.body.title;
    const content=req.body.content;
    const video=req.files['vid'][0].path.substring(7);;
    const newBlog = new Blog({
        title,
        content,
        profileImage,
        video
      });
      newBlog.save()
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
     blogarr.push(newBlog);
    // console.log(newBlog)
     res.send(blogarr);
  });
  app.post("/del", (req, res) => {
    const pass=req.body;
    blogarr= blogarr.filter(function (item) {
       return item.title!== pass.title && item.content!=pass.content ;
    });
    res.send(blogarr);
  });

  app.listen(5000, function () {
    console.log("Server started on port 5000");
  });
}
