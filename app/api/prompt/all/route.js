import escapeStringRegexp from "escape-string-regexp";

import { connectToDatabase } from "@utils/database";

import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    await connectToDatabase();

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query");

    let prompts;

    if (query) {
      const escapedQuery = escapeStringRegexp(query);

      prompts = await Prompt.find({
        prompt: { $regex: escapedQuery, $options: "i" },
      }).populate("author");
    } else {
      prompts = await Prompt.find().populate("author");
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error getting prompts" }), {
      status: 500,
    });
  }
};
