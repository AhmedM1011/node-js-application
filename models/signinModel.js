const mongoose = require("mongoose");

const signinSchema = new mongoose.Schema(
    {
        first_name: { type: String,required: [true, "please add name"],trim: true},
        created_at: { type: Date, default: new Date() },
        imagesUrl: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Signin", signinSchema);
