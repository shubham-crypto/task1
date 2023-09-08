import React from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {

  const [notes , setNotes]=React.useState([])
  axios.post("http://localhost:5000/load")
  .then(res=>{
    setNotes(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
  
  function addNote(newNote){
    axios.post("http://localhost:5000/add",newNote,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res=>{
      setNotes(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function deleteNote(note){
    console.log(note);
    axios.post("http://localhost:5000/del",note)
    .then(res=>{
      setNotes(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem,index)=>{
        return<Note
        key={index}
         title={noteItem.title}
         content={noteItem.content}
         profileImage={noteItem.profileImage}
         video={noteItem.video}
         onDelete={deleteNote}
         />
      })}
      <Note title="Note title" content="Note content" />
    </div>
  );
}

export default App;
