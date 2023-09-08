import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from '@mui/material/Fab'
import Zoom from '@mui/material/Zoom'

function CreateArea(props) {

    const [isExpanded , setExpanded]=React.useState(false)

    const [note , setNote]=React.useState({
        title : "",
        content : "",
        profileImage:"",
        video :""
    })

    function handleChange(event){
        const {name , value}=event.target
        setNote(prevNote=>{
            return{
                ...prevNote,
                [name] : value

            }
        })
    }

    const [file,setFile]=useState()
    const [vfile,setvFile]=useState()

    function submitNote(event){
        event.preventDefault();
        const formdata= new FormData();
        formdata.append('image',file)
        formdata.append('vid',vfile)
        formdata.append('title',note.title)
        formdata.append('content',note.content)
        props.onAdd(formdata)
        setNote({
            title : "",
            content : "",
            profileImage:"",
            video :""
        })
    }

    function expand(){
      setExpanded(true)
    }
  return (
    <div>
      <form className="create-note">
        {isExpanded &&(
          <input name="title" onChange={handleChange} value={note.title} placeholder="Title" />
        )}
        <textarea onClick={expand}  name="content" onChange={handleChange} value={note.content} placeholder="Add a Blog..." rows={isExpanded? 3 : 1} />
        <input type="file" accept="image/*" onChange={e=> setFile(e.target.files[0])}  />
        <input type="file" accept="video/*" onChange={e=> setvFile(e.target.files[0])}  />
        <Zoom in={isExpanded? true : false}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
