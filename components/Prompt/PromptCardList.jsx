import PromptCard from "./PromptCard";
import { Skeleton } from "@mantine/core";

const PromptCardList = ({ data, loading, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.length ? (
        data.map((post) => {
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          );
        })
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default PromptCardList;
