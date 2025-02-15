import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Please provide a prompt"],
  },
  tag: {
    type: String,
    required: [true, "Please provide a tag"],
  },
});

// Use prompt that already exists or create new one based on our schema
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
