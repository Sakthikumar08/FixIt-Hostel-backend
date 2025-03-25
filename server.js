const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const complaintRoutes = require('./src/routes/complaintRoutes');
const userRoutes = require('./src/routes/userRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const laundryRoutes = require("./src/routes/laundryRoutes");
const roomCleanRoutes = require("./src/routes/roomcleanRoutes");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/complaints', complaintRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/laundry', laundryRoutes);
app.use('/api/roomclean', roomCleanRoutes);

// Health Check Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
