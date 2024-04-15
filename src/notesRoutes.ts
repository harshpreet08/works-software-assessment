import express from "express";
import notesHandlers from "./notesHandlers";

const router = express.Router();

router.use(express.json());

router.post("/", notesHandlers.createNote);
router.get("/", notesHandlers.getNotes);
router.get("/:id", notesHandlers.getNoteById);
router.put("/:id", notesHandlers.updateNoteById);
router.delete("/:id", notesHandlers.deleteNoteById);

export default router;
