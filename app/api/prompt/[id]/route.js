import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
import Tag from "@models/Tag";

export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { id } = await params;
    await Prompt.findByIdAndDelete(id);

    return new Response(
      JSON.stringify(
        { message: "Prompt deleted successfully" },
        { status: 200 }
      )
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify(
        { message: "could not find prompt to delete" },
        { status: 500 }
      )
    );
  }
};

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { id } = await params;

    const prompt = await Prompt.findById(id).populate("user").populate("tags");

    if (!prompt) {
      return new Response(JSON.stringify({ message: "prompt not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error getting prompt" }), {
      status: 500,
    });
  }
};

export const PATCH = async (req, { params, body }) => {
  const { prompt, tags } = await req.json();

  try {
    await connectToDatabase();

    const { id } = await params;

    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response(JSON.stringify({ message: "prompt not found" }), {
        status: 404,
      });
    }

    // Tags reusable, so save tags we don't have or use tags we already do
    const tagIds = await Promise.all(
      tags.map(async (_tag) => {
        let tag = await Tag.findOne({ name: _tag.name.toLowerCase() });
        if (!tag) {
          tag = new Tag({ name: _tag.name.toLowerCase() });
          await tag.save();
        }
        return tag._id;
      })
    );

    existingPrompt.prompt = prompt;

    existingPrompt.tags = tagIds;

    await existingPrompt.save();

    return new Response(
      {
        message: "Post edited successfully",
        post: existingPrompt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error updating prompt" }), {
      status: 500,
    });
  }
};
