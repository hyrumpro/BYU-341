const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const contactRoutes = require('./routes/contactRoutes');
const { swaggerUi, specs } = require('./swagger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

connectDB();

// Use contact routes
app.use('/api/contacts', contactRoutes);

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});