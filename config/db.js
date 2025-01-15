const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);

        console.log(`Connected to DATABASE ${conn.connection.host}`.bgCyan.white);
    } catch (error) {
        console.error(`Error in connection DB: ${error.message}`.bgRed.white);
        process.exit(1); // Exit process with failuree
    }
};

module.exports = connectDB;
