const mongoose = require('mongoose');
const { dbString } = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect(dbString);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
}

module.exports = {connectDB, mongoose};