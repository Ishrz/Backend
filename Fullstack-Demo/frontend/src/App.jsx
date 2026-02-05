import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([
    { title: "note1 ", description: "description 1" },
    { title: "note2 ", description: "description 2" },
    { title: "note3 ", description: "description 3" },
  ]);

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
    </>
  );
}

export default App;
