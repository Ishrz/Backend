import { useState } from "react";
import axios from "axios"
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes =async ()=>{
    const axData=await axios.get("http://127.0.0.1:3000/notes")
    console.log(axData)
    setNotes(axData.data.notes)
  }

  const handleDelete=async(id)=>{
    console.log(id)
    const response=await axios.delete(`http://127.0.0.1:3000/notes/${id}`)
    fetchNotes()
    console.log(response)
  }

  const handleEdit=async ()=>{
    
  }

  return (
    <>
      <div id="notes">
        {notes.map((note) => (
          <div id="note">
            <h1>{note.title}</h1>
            <h2>{note.description}</h2>
            <div id="btnsDiv">
              <button id="btn2" onClick={()=>handleDelete(note._id)}>Delete</button>
              <button id="btn" onClick={()=>handleEdit(note._id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button id="btn" onClick={fetchNotes}>
          Get Notes
        </button>
      </div>
    </>
  );
}

export default App;
