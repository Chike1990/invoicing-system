// Database connection 
const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected successfully')
    } catch (err) {
        console.error('Error connecting to database:', err)
    }
}
module.exports = connectToDatabase;