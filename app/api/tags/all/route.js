import escapeStringRegexp from "escape-string-regexp";

import { connectToDatabase } from "@utils/database";

import Tag from "@models/Tag";

export const GET = async (req) => {
  try {
    await connectToDatabase();

    const tags = await Tag.find();

    return new Response(JSON.stringify(tags), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error getting prompts" }), {
      status: 500,
    });
  }
};
