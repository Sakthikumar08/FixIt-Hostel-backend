const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const complaintRoutes = require('./routes/complaintRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const laundryRoutes = require("./routes/laundryRoutes");
const roomCleanRoutes = require("./routes/roomcleanRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/complaints', complaintRoutes);
app.use('/api/users', userRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/laundry", laundryRoutes);
app.use("/api/roomclean", roomCleanRoutes);




app.get('/', (req, res) => {
    res.send('API is running...');
});
module.exports = app;
