
import express from 'express';
import { authMiddleWare } from './../middleware/authMiddleware.js';
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from '../controllers/noteController.js';

const route = express.Router()

route.post("/create", createNote );
route.get("/all", getNotes )
route.get("/:id", getNoteById);
route.put('/update/:id', updateNote);
route.delete('/delete/:id', deleteNote);


export default route;