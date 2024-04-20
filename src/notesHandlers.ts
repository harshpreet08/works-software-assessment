import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getClient } from "./db";

const client = getClient();
const DB_NAME = "notes";

// Create Note API
async function createNote(req: Request, res: Response) {
    try {
        const { title, content } = req.body;
        const db = client.db(DB_NAME);
        const collection = db.collection(DB_NAME);
        const result = await collection.insertOne({ title, content });
        
        if (!result.insertedId) {
          return res.status(500).json({ error: "Failed to insert note. Please try again later." });
        }
        
        const insertedNote = await collection.findOne({ _id: result.insertedId });
        
        if (!insertedNote) {
          return res.status(500).json({ error: "Failed to retrieve inserted note. Please try again later." });
        }
    
        res.status(201).json(insertedNote);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}

// Get all notes API
async function getNotes(req: Request, res: Response) {
    try {
        const db = client.db(DB_NAME);
        const collection = db.collection(DB_NAME);
        const notes = await collection.find({}).toArray();
        res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}

// Get note by Id API
async function getNoteById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const db = client.db(DB_NAME);
        const collection = db.collection(DB_NAME);
        const note = await collection.findOne({ _id: new ObjectId(id) });
        if (!note) {
          return res.status(404).json({ error: "Note not found." });
        }
        res.status(200).json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "The note id provided seems incorrect. Please check." });
    }
}

// Update note by Id API
async function updateNoteById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const db = client.db(DB_NAME);
        const collection = db.collection(DB_NAME);
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { title, content } }
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Note not found." });
        }
        res.status(200).json({ message: "Note updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "The note id provided seems incorrect. Please check." });
    }
}

// Delete note by Id API
async function deleteNoteById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const db = client.db(DB_NAME);
        const collection = db.collection(DB_NAME);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Note not found." });
        }
        res.status(200).json({ message: "Note deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "The note id provided seems incorrect. Please check." });
    }
}

export default {
    createNote,
    getNotes,
    getNoteById,
    updateNoteById,
    deleteNoteById
};
