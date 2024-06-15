const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");

const registerController = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		//validation
		if (!name) {
			return res.status(400).send({
				success: false,
				message: "name is required",
			});
		}
		if (!email) {
			return res.status(400).send({
				success: false,
				message: "email is required",
			});
		}
		if (!password || password.length < 6) {
			return res.status(400).send({
				success: false,
				message: "password is required",
			});
		}
		//existing user
		const existingUser = await userModel.findOne({ email });
		if (existingUser) {
			return res.status(500).send({
				success: false,
				message: "User Already Register with this email",
			});
		}
		//hashed password
		const hashedPassword = await hashPassword(password);

		//save user
		const user = await userModel({
			name,
			email,
			password: hashedPassword,
		}).save();

		return res.status(201).send({
			success: true,
			message: "Registration Successfull please login",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			success: false,
			message: "Error in Register API",
			error,
		});
	}
};

const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		//validation
		if (!email || !password) {
			return res.status(500).send({
				success: false,
				message: "Please provide Email or Password",
			});
		}
		//find user
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(500).send({
				success: false,
				message: "User not found",
			});
		}
		//match password
		const match = await comparePassword(password, user.password);
		if (!match) {
			return res.status(500).send({
				success: false,
				message: "Invalid username or password",
			});
		}
		//TOKEN JWT
		const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		//undefined password
		user.password = undefined;
		return res.status(200).send({
			success: true,
			message: "login successfull",
			token,
			user,
		});
	} catch (error) {
		console.log(error);
		``;
		return res.status(500).send({
			success: false,
			message: "error in login api",
			error,
		});
	}
};

module.exports = { registerController, loginController };
