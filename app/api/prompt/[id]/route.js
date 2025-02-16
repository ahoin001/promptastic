import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { id } = await params;

    await Prompt.findByIdAndDelete(id);

    return new Response(
      { message: "Prompt deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      { message: "could not find prompt to delete" },
      { status: 500 }
    );
  }
};

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { id } = await params;

    const prompt = await Prompt.findById(id).populate("author");

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
  const { prompt, tag } = await req.json();

  try {
    await connectToDatabase();

    const { id } = await params;

    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response(JSON.stringify({ message: "prompt not found" }), {
        status: 404,
      });
    }

    existingPrompt.prompt = prompt;

    existingPrompt.tag = tag;

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
