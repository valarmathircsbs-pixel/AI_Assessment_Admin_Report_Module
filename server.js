require('dotenv').config();

console.log("🚀 THIS SERVER FILE IS RUNNING");


const connectDB = require('./config/db');
const express = require('express');
const app = express();

const adminReportRoutes = require('./routes/adminReportRoutes');

const PORT = process.env.PORT || 5000;

// Middleware (optional for future use)
app.use(express.json());
app.use(express.static('public'));



// Use admin routes
app.use('/admin', adminReportRoutes);
connectDB();

const adminAuthRoutes = require('./routes/adminAuthRoutes');
app.use('/admin/auth', adminAuthRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});