
const dotenv = require('dotenv');
dotenv.config();

console.log('port:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('Cloudinary Name:', process.env.CLOUDINARY_NAME);  // Should print the value from your .env file
console.log('API Key:', process.env.API_KEY);                    // Should print the value from your .env file
console.log('API Secret:', process.env.API_SECRET);              // Should print the value from your .env file

const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const mongoose = require("mongoose");

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Cloudinary Configuration
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

cloudinary.api.ping()
  .then(result => console.log('Cloudinary configuration successful:', result))
  .catch(error => console.error('Error configuring Cloudinary:', error));

// REST Object
const app = express();

// Middleware
const allowedOrigins = [
	'https://interview-task-one-eta.vercel.app', // Production domain
	'http://localhost:3000',                    // Local development domain
  ];
  
  app.use(
	cors({
	  origin: (origin, callback) => {
		// Allow requests with no origin (like mobile apps or curl requests)
		if (!origin || allowedOrigins.includes(origin)) {
		  callback(null, true);
		} else {
		  callback(new Error('Not allowed by CORS'));
		}
	  },
	  credentials: true, // Allow credentials to be sent with requests
	})
  );
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to full stack app",
  });
});

app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/signin", require("./routes/signinRoutes"));

// PORT
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`.bgGreen.white);
});
