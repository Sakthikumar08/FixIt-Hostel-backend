const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/superhostel");
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error(error.message);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;
