import express from "express";
import { connectToMongoDB } from "./db";
import cors from "cors";
import noteRoutes from "./notesRoutes"

require('dotenv').config();

const app = express();
const port = 3000;

connectToMongoDB();

app.use(cors());
app.use("/notes", noteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
