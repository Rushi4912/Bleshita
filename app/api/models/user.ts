import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { // Changed from "Name" to "name" for better consistency
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: { // Field for hashed password
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
