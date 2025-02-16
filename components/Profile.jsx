import PromptCard from "@components/PromptCard";

const Profile = ({ description, name, posts, handleDelete, handleEdit }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">{name} Profile</h1>
      <p className="desc text-left">{description}</p>

      <div className="mt-10 prompt_layout">
        {posts.map((post) => {
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Profile;
