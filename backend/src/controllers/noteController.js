import { Note } from "../models/noteModel.js";

export async function createNote(req, res) {
  const { title, note } = req.body;

  try {
    if (!title || !note) {
      return res.status(400).json({ message: "Title and note are required" });
    }

    const result = await Note.insertOne({ title, note });
    res.status(200).json({ message: "Note created", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json({ notes: notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateNote(req, res) {
  const { title, note } = req.body;
  const { id } = req.params;
  try {
    if (!title) {
      return res.status(400).json({ message: "Title and note are required" });
    }

    const result = await Note.findByIdAndUpdate({ _id: id }, { title, note }, { new: true });
    res.status(200).json({ message: "Note updated", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteNote(req, res) {
  const { id } = req.params;
  try {
    const result = await Note.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Note deleted", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getNoteById(req, res) {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ data: note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
