import { useState } from "react";
import axios from "axios"
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  const btnClick =async ()=>{
    const axData=await axios.get("http://127.0.0.1:3000/notes")
    // console.log(axData)
    setNotes(axData.data.notes)
  }

  return (
    <>
      <div id="notes">
        {notes.map((note) => (
          <div id="note">
            <h1>{note.title}</h1>
            <h2>{note.description}</h2>
          </div>
        ))}
      </div>
      <div>
        <button id="btn" onClick={btnClick}>
          Get Notes
        </button>
      </div>
    </>
  );
}

export default App;
