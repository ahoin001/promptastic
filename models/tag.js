import mongoose from "mongoose";

const { Schema, model, models } = mongoose;
// import { Schema, model, models } from "mongoose";

const TagSchema = new Schema({
  name: {
    type: String,
    unique: true, // Prevent duplicate tags
    lowercase: true,
    trim: true,
    required: [true, "Tag name is required"],
  },
  createdAt: { type: Date, default: () => Date.now() },
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
