import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { id } = await params;

    const prompts = await Prompt.find({
      author: id,
    }).populate("author");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error getting prompts" }), {
      status: 500,
    });
  }
};
