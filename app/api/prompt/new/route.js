import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { prompt, tag, author } = await req.json();

  try {
    await connectToDatabase();

    const newPrompt = await Prompt.create({
      author: author,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error creating prompt" }), {
      status: 500,
    });
  }
};
