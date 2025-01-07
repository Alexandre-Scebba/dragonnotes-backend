const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const notesRoutes = require('./routes/notes'); // my notes router
require('dotenv').config();
console.log('MongoDB URI:', process.env.MONGO_URI);


// middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Allow cross-origin requests

// Connect to MongoDB
const dbURI = process.env.MONGO_URI;

if (!dbURI) {
    console.error('MongoDB connection string is missing. Set MONGO_URI in your .env file.');
    process.exit(1);
}

mongoose
    .connect(dbURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Database connection error:', error));

// Root route 
app.get('/', (req, res) => {
    res.send('Welcome to the DragonNotes API!');
});

// routes
app.use('/api/notes', notesRoutes);

// Error handling
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
