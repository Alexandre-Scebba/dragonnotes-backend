const express = require('express');
const router = express.Router();
const NoteModel = require('../models/noteModel');


// POST
router.post('/create', async (req, res) => {
    const { title, content } = req.body;

    // validate request
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        // Create new note in db
        const newNote = new NoteModel({
            title,
            content,
            createdAt: new Date(),
        });

        //save to db
        const savedNote = await newNote.save();

        // success response
        return res.status(201).json({
            message: 'Note created successfully',
            note: savedNote,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating note', error })
    }
});

//GET
router.get('/', async (req, res) => {
    try {
        const notes = await NoteModel.find(); // fetch all notes from db
        return res.status(200).json(notes); // send notes as JSON
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching notes', error })
    }
});

//PUT
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    // validate request
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        const updatedNote = await NoteModel.findByIdAndUpdate(
            id,
            { title, content },
            { new: true } // return updated note
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note note found' });
        }

        return res.status(200).json({ message: 'Notes successfully updated', note: updatedNote });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating note', error});
    }
});

// DELETE by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNote = await NoteModel.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        return res.status(200).json({ message: 'Note deleted successfully', note: deletedNote });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting note', error });
    }
});

module.exports = router;
