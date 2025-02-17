import PromptCard from "@components/Prompt/PromptCard";
import { Skeleton } from "@mantine/core";

const Profile = ({
  description,
  fetchingUserPosts,
  name,
  posts,
  handleDelete,
  handleEdit,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">{name} Profile</h1>
      <p className="desc text-left">{description}</p>

      <Skeleton visible={fetchingUserPosts} width="100%" height={600}>
        <div className="mt-10 prompt_layout">
          {posts.length === 0 ? (
            <p>No prompts found</p>
          ) : (
            posts.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))
          )}
        </div>
      </Skeleton>
    </section>
  );
};

export default Profile;
