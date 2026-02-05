const express = require("express");
const cors = require("cors");
const notesModel = require("./models/notes.model");

const app = express();

app.use(cors());
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
  const { description } = req.body;

  const notes = await notesModel.findByIdAndUpdate(
    id,
    {
      description,
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

app.delete("/notes:id", (req, res) => {});

module.exports = app;
