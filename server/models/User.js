import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // can be empty for Google sign-in
    googleId: { type: String }, // for Google login
}, { timestamps: true });

export default mongoose.model("User", userSchema);
