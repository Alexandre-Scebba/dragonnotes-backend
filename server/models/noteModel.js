const mongoose = require('mongoose');

// Define the schema for a note
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the Note model
const NoteModel = mongoose.model('Note', noteSchema);
module.exports = NoteModel;
