const express = require("express");
const cors = require("cors");
const notesModel = require("./models/notes.model");

const app = express();

app.use(cors({
    Domain:["http://localhost:5173/"]
}));
app.use(express.json());

app.get("/notes", async (req, res) => {
  const notes = await notesModel.find();

  res.json({
    message: "Heres your Notes data",
    notes,
  });
});

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const notes = await notesModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Notes created successfuly",
    notes,
  });
});


app.patch("/notes/:id", async (req, res) => {
  const  {id}  = req.params;
  const data = req.body.data;
  const notes = await notesModel.findByIdAndUpdate(
    id,
    {
      ...data,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    message:"note Updated Successfuly",
    UpdatedNote:notes
  })
});

app.delete("/notes/:id",async (req, res) => {
    const {id} = req.params
    const note= await notesModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"deleted note successfully",
        note:note
    })
});

module.exports = app;
