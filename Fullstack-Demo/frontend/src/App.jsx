import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const fetchNotes = async () => {
    const axData = await axios.get("http://127.0.0.1:3000/notes");
    // console.log(axData)
    setNotes(axData.data.notes);
  };

  const handleDelete = async (id) => {
    console.log(id);
    const response = await axios.delete(`http://127.0.0.1:3000/notes/${id}`);
    fetchNotes();
    // console.log(response)
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    const response = await axios.post("http://127.0.0.1:3000/notes", {
      title: title.value,
      description: description.value,
    });
    title.value = "";
    description.value = "";
    console.log(response.data.message);
    fetchNotes();
  };

  const handleUpdate = async (noteId,newTitle,newDesc) => {
    // console.group("after save call inside update fnc")
    // console.log(newTitle)
    //     console.log(newDesc)


    const response=await axios.patch(`http://127.0.0.1:3000/notes/${noteId}`,{
      data:{
        title:newTitle,
      description:newDesc
      }
    })
    fetchNotes()
    console.log(response)

  };

  useEffect(() => {
    fetchNotes()
  }, [isEdit]);

  return (
    <div className="mainDiv">
      <div className="formDiv">
        <form className="submitNotes" onSubmit={submitHandler}>
          <label>
            Title :
            <input name="title" type="text" />
          </label>
          <label>
            Description :
            <input name="description" type="text" />
          </label>
          <button type="submit">Add Note</button>
        </form>
      </div>
      <div id="notes">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div>
        <button id="btn" onClick={fetchNotes}>
          Get Notes
        </button>
      </div>
    </div>
  );
}

function NoteCard({ note, handleUpdate, handleDelete }) {
  const [isEdit, setIsEdit] = useState(false);

  const [newTitle, setNewTitle] = useState(note.title);
  const [newDesc, setNewDesc] = useState(note.description);

  const saveChanges = () => {
    handleUpdate(note._id,newTitle,newDesc);
    setIsEdit(false);
  };

  const cancelChanges = () => {
    setNewTitle(note.title);
    setNewDesc(note.description);
    setIsEdit(false);
  };

  return (
    <div id="note" key={note._id}>
      {isEdit ? (
        <div className="editDiv">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(()=>e.target.value)}
            placeholder="New Title"
          />

          <input
            className="descChnage"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="New Description"
          />

          <div className="editDivBtns">
            <button className="saveChange" onClick={saveChanges}>
              Save
            </button>
            <button className="cancelChanges" onClick={cancelChanges}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="viewNotes">
          <h1>{note.title}</h1>
          <h2>{note.description}</h2>
        </div>
      )}
      <div id="btnsDiv">
        <button id="btn2" onClick={() => handleDelete(note._id)}>
          Delete
        </button>
        <button id="btn" onClick={() => setIsEdit(() => !isEdit)}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default App;
