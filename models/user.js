import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    // required: [true, "Please provide a username"],
    unique: [true, "Username already exists"],
    match: [
      /^[a-zA-Z0-9\s]+$/,
      "Username can only contain letters, numbers, and spaces",
    ],
  },
  image: {
    type: String,
    // default: "/assets/images/default-profile.jpg",
  },
  createdAt: { type: Date, default: Date.now() },
});

UserSchema.virtual("fullName").get(function () {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  }
  return this.firstName || this.lastName || "";
});

const User = models.User || model("User", UserSchema);

export default User;
