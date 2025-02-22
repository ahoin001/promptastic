import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
import Tag from "@models/tag";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { id } = await params;

    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const tagFilter = searchParams.get("tag");

    let query = {
      userId: id,
    };

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
      .populate("tags")
      .sort(sortOption);
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error getting prompts" }), {
      status: 500,
    });
  }
};
