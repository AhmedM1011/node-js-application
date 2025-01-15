const signinModel = require("../models/signinModel");

const getUsersController = async (req, res) => {
    try {
        console.log("Came in get users");

        // Fetch all sign-in records from the database, sorted by createdAt in descending order
        const users = await signinModel.find().sort({ createdAt: -1 }); // -1 for descending order

        // Check if there are users in the database
        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found." });
        }

        // Format the data to return only relevant fields
        const formattedUsers = users.map(user => ({
            full_name: user.first_name, // Assuming first_name is the full name
            timestamp: user.createdAt,  // Assuming createdAt is the timestamp when the sign-in record was created
            photo_url: user.imagesUrl,  // URL of the uploaded photo
        }));

        res.status(200).json({ data: formattedUsers });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

module.exports = { getUsersController };
