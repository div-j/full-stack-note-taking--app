import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db.js";
import userRoute from './routes/userRoute.js';
import noteRoute from './routes/noteRoute.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Note App Backend running");
});

app.use('/user', userRoute);
app.use("/notes", noteRoute);

connectDb();
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
