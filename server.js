require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connectDB');
const personRoutes = require('./Routes/person');

const app = express();

// Middleware
app.use(express.json());

// DATABASE CONNECTION
connectDB();

// Routes
app.use('/api/person', personRoutes);

// Start server
const PORT = process.env.PORT || 4015;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
