import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    unique: [true, "Username already exists"],
    match: [
      /^[a-zA-Z0-9\s]+$/,
      "Username can only contain letters, numbers, and spaces",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  image: {
    type: String,
  },
  createdAt: { type: Date, default: () => Date.now() },
});

const User = models.User || model("User", UserSchema);

export default User;
