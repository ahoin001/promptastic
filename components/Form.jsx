import Link from "next/link";

import { TagsInput } from "@mantine/core";

const Form = ({
  loading,
  handleSubmit,
  post,
  tags,
  setPost,
  setTags,
  type,
}) => {
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

          {/* TODO checkout options filtering in the docs to suggest existing tags */}
          {/* TODO checkout Inside popover for quick tags edit */}
          <TagsInput
            data={[]}
            value={tags}
            onChange={setTags}
            className="mt-2"
            placeholder="Enter tag and press enter or comma"
            maxTags={4}
            clearable
          />

          {/* TODO  Maybe replace with some kind of pill input */}
          {/* <input
            type="text"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            className="form_input"
            required
          /> */}
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {loading ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
