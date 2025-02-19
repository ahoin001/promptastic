import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
import Tag from "@models/tag";

export const POST = async (req) => {
  const { prompt, tags, user } = await req.json();

  try {
    await connectToDatabase();

    // I want to reuse tags we already have, so do a check
    const tagIds = await Promise.all(
      tags.map(async (tagName) => {
        let tag = await Tag.findOne({ name: tagName.toLowerCase() });
        if (!tag) {
          tag = new Tag({ name: tagName.toLowerCase() });
          await tag.save();
        }
        return tag._id;
      })
    );

    const newPrompt = await Prompt.create({
      user: user,
      prompt,
      tags: tagIds,
    });

    await newPrompt.save();

    return new Response(
      JSON.stringify({
        message: "Prompt created successfully",
        prompt: newPrompt,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error creating prompt" }), {
      status: 500,
    });
  }
};
