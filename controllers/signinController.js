const fs = require('fs');  // Import fs module
const signinModel = require("../models/signinModel");
const uploadOnCloudinary = require("../utils/UploadOnCloudinary");

const signinController = async (req, res) => {
    
    try {
        
      const { first_name } = req.body;
  
      if (!first_name) {
        return res.status(400).json({ error: "First name is required." });
      }
      if (!req.file) {
        return res.status(400).json({ error: "File is required." });
      }
  
      const imagesUrl = await uploadOnCloudinary(req.file);
  
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });

      const newSignin = new signinModel({
        first_name,
        imagesUrl,
      });
  
      const savedSignin = await newSignin.save();
  
      res
        .status(201)
        .json({ message: "Sign-in record created successfully.", data: savedSignin });
    } catch (error) {
      console.error("Error creating sign-in record:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
};

module.exports = { signinController };
