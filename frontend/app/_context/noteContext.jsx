"use client";

import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const NoteContext = createContext();

export function useNote() {
  return useContext(NoteContext);
}

export function NoteProvider({ children }) {
  const [searchInput, setSearchInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getNotes() {
      try {
        let result = await axios.get("https://note-app-backend-7628.onrender.com/notes/all");
        setNotes(result.data.notes);
      } catch (error) {
        console.log(error);
      }
    }
    getNotes();
  }, []);

  async function handleDelete(id) {
    try {
      let response = await axios.delete(`https://note-app-backend-7628.onrender.com/notes/delete/${id}`);
      if (response.status === 200) {
        setNotes((prev) => prev.filter((note) => note._id !== id));
        toast.success("Note Deleted Successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to delete note");
    }
  }

  const updateNote = async (noteId, updatedData) => {
    try {
      setLoading(true);
      const resp = await axios.put(`https://note-app-backend-7628.onrender.com/notes/update/${noteId}`, updatedData);
      if (resp.status === 200) {
        setNotes((prev) =>
          prev.map((note) => (note._id === noteId ? { ...note, ...updatedData } : note))
        );
        toast.success("Note updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (newNote) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const resp = await axios.post("https://note-app-backend-7628.onrender.com/notes/create", newNote, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (resp.status === 201) {
        setNotes((prev) => [resp.data.data, ...prev]);
        toast.success("Note added successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        searchInput,
        setSearchInput,
        edit,
        setEdit,
        loading,
        notes,
        setNotes,
        editingNoteId,
        setEditingNoteId,
        handleDelete,
        updateNote,
        addNote,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
