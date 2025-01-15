const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const { cloudinaryconfig } = require("./utils/cloudinaryConfig");
const cloudinary = require("cloudinary").v2;


//DOT ENV
require("dotenv").config();
// dotenv.config();

//MONDODB Connection
connectDB();

// REST OBJECT
const app = express();

//Middlewares

// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Specify your frontend domain
// 	res.setHeader('Access-Control-Allow-Credentials', 'true');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// 	next();
//   });
  app.use(cors({ origin: 'https://interview-task-eosin.vercel.app' }));

  
// app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
cloudinaryconfig

cloudinary.api.ping((error, result) => {
	if (error) {
	  console.error('Error configuring Cloudinary:', error);
	} else {
	  console.log('Cloudinary configuration successful:', result);
	}
  });

//ROUTES
app.get("", (req, res) => {
	res.status(200).json({
		success: true,
		message: "Welcome to full stack app",
	});
});
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/signin", require("./routes/signinRoutes"))

//PORT
const PORT = process.env.PORT || 8080;

//MONDODB Connection
// connectDB();
	mongoose.connect(process.env.MONGO_URL).then(() => {
		console.log('mongodb connected');
	  
	  }).catch((err) => {
		console.log(err);
	  
	  })

//Listen
app.listen(PORT, () => {
	console.log(`Server Running ${PORT}`.bgGreen.white);
});
