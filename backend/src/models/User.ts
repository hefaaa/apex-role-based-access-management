import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  department: {
    type: String,
    default: "IT"
  },

  role: {
    type: String,
    enum: ["Admin", "General User"],
    required: true
  },

  accessLevel: {
    type: String,
    default: "Basic"
  },

  active: {
    type: Boolean,
    default: true
  },

  lastLogin: {
    type: String,
    default: () => new Date().toLocaleString()
  }

});

export default mongoose.model(
  "User",
  userSchema
);