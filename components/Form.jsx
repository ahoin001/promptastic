import Link from "next/link";

import { Button, TagsInput } from "@mantine/core";
import { useTags } from "@hooks/useTags";

const Form = ({
  loading,
  handleSubmit,
  post,
  tags,
  setPost,
  setTags,
  type,
}) => {
  const { data: allTags = [] } = useTags();

  const formattedAvailableTags = allTags.length
    ? allTags.map((tag) => tag.name)
    : [];

  const formattedTags = tags.map((tag) => tag.name);

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc tetx-left max-w-md">
        {type === "Create"
          ? "Create a post to share with the community."
          : "Edit your post."}
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-2xl mt-10 gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            className="form_textarea"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags
          </span>

          <TagsInput
            data={formattedAvailableTags}
            value={formattedTags}
            onChange={(newTags) =>
              setTags(newTags.map((tag) => ({ name: tag })))
            }
            className="mt-2"
            placeholder="Enter tag and press enter or comma"
            maxTags={4}
            clearable
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/">
            <Button radius="xl" variant="outline" color="black">
              Cancel
            </Button>
          </Link>

          <Button
            type="submit"
            loading={loading}
            radius="xl"
            variant="gradient"
            gradient={{ from: "red", to: "orange", deg: 90 }}
          >
            {type}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Form;
