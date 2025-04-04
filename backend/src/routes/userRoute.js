import express from 'express';
import { createUser, login, profile } from "../controllers/userController.js";
import { authMiddleWare } from './../middleware/authMiddleware.js';

const route = express.Router();

route.post("/create", createUser);
route.post("/login", login);
route.get("/profile", authMiddleWare, profile);

export default route;