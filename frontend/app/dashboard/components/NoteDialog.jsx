"use client";
import { useNote } from "@/app/_context/noteContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export function NoteDialog() {
  const [formData, setFormData] = useState({
    title: "",
    note: "",
  });
  const {
    setEdit,
    loading,
    updateNote,
    addNote,
    edit,
    editingNoteId,
    notes,
    isModalOpen,
    setIsModalOpen,
  } = useNote();

  const noteToEdit = notes.find((note) => note._id === editingNoteId);

  useEffect(() => {
    if (edit && noteToEdit) {
      setFormData({
        title: noteToEdit.title,
        note: noteToEdit.note,
      });
    } else {
      // Reset form when adding a new note
      setFormData({
        title: "",
        note: "",
      });
    }
  }, [noteToEdit, edit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      // Edit note
      await updateNote(editingNoteId, formData);
    } else {
      // Create note
      await addNote(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(isOpen) => {
        setIsModalOpen(isOpen);
        setEdit(false);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{edit ? "Edit Note" : "Create Note"}</DialogTitle>
          <DialogDescription>
            {edit ? "Edit" : "Add"} your notes here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <hr className="my-4" />
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="">
              <Label htmlFor="note" className="text-right">
                Content
              </Label>
              <Textarea
                id="note"
                className="col-span-3 h-64"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {loading ? "Loading..." : "Save Note"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
