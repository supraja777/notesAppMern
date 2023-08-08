import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";
const Noteitem = (props) => {
  const { note, updateNote} = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
           {note.description}
          </p>
          <div className="d-flex align-items-center">
          <button type="button" className="btn btn-primary mx-2" onClick={()=>{updateNote(note)}}>Edit</button>
          <button type="button" className="btn btn-danger mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully", "success")}}>Delete</button>
          </div>
        
        </div>
      </div>
      
    </div>
  );
};

export default Noteitem;
