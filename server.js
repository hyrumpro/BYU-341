const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const { getAllContacts, getContactById, createContact } = require('./controllers/contactController');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.get('/', getAllContacts);
app.get('/:id', getContactById);
app.post('/', createContact);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});