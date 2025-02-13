import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username already exists"],
    match: [/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"], // regex may fail since not using recommended
  },
  image: {
    type: String,
    // default: "/assets/images/default-profile.jpg",
  },
});

const User = models.User || model("User", UserSchema);

export default User;
