import escapeStringRegexp from "escape-string-regexp";

import { connectToDatabase } from "@utils/database";

import Prompt from "@models/prompt";
import Tag from "@models/Tag";

export const GET = async (req) => {
  try {
    await connectToDatabase();

    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const tagFilter = searchParams.get("tag");

    let query = {};

    if (search) {
      const escapedQuery = escapeStringRegexp(search);
      query.prompt = { $regex: escapedQuery, $options: "i" };
    }

    if (tagFilter) {
      const tag = await Tag.findOne({ name: tagFilter });
      if (tag) {
        query.tags = tag._id;
      }
    }

    const prompts = await Prompt.find(query)
      .populate("user", "username")
      .populate("tags", "name")
      .lean();

    if (sort === "votes") {
      prompts.sort(
        (a, b) =>
          b.votes.reduce((sum, v) => sum + v.vote, 0) -
          a.votes.reduce((sum, v) => sum + v.vote, 0)
      );
    } else if (sort === "desc") {
      prompts.sort((a, b) => b.createdAt - a.createdAt);
    } else {
      prompts.sort((a, b) => a.createdAt - b.createdAt);
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error getting prompts" }), {
      status: 500,
    });
  }
};
