import escapeStringRegexp from "escape-string-regexp";
import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
import Tag from "@models/tag";

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

    let sortOption = {};
    if (sort === "votes") {
      sortOption = { votes: -1 }; // Assuming you have a field for votes
    } else if (sort === "desc") {
      sortOption = { createdAt: -1 };
    } else {
      sortOption = { createdAt: 1 };
    }

    const prompts = await Prompt.find(query)
      .populate("user")
      .populate("tags", "name")
      .select("prompt createdAt")
      .sort(sortOption)
      .lean();

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error getting prompts" }), {
      status: 500,
    });
  }
};
