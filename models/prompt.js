import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Please provide a prompt"],
  },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  votes: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      vote: { type: Number, enum: [1, -1] },
    },
  ],
  createdAt: { type: Date, default: () => Date.now() },
});

PromptSchema.virtual("voteCount").get(() => {
  return this.votes.reduce((sum, v) => sum + v.vote, 0);
});

// Use prompt that already exists or create new one based on our schema
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
