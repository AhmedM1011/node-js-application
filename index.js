const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

//DOT ENV
require("dotenv").config();
// dotenv.config();

//MONDODB Connection
connectDB();

// REST OBJECT
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.get("", (req, res) => {
	res.status(200).json({
		success: true,
		message: "Welcome to full stack app",
	});
});
app.use("/api/v1/auth", require("./routes/userRoutes"));

//PORT
const PORT = process.env.PORT || 80;

//Listen
app.listen(PORT, () => {
	console.log(`Server Running ${PORT}`.bgGreen.white);
});
