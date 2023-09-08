import React from "react";
import DeleteIcon from "@mui/icons-material/Delete"

function Note(props) {

  function handleClick(){
    props.onDelete(props)
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <img src={props.profileImage} className="im" alt={""}></img>
      <video width="250" height="200" controls>
        <source src={props.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={handleClick} >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
