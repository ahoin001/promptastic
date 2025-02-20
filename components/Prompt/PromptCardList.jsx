import PromptCard from "./PromptCard";
import { Group, Skeleton } from "@mantine/core";

const PromptCardList = ({ data, loading, handleTagClick }) => {
  return (
    <div className="space-y-6 sm:columns-2 sm:gap-6 xl:columns-3">
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
        <Group position="center">No posts found</Group>
      )}
    </div>
  );
};

export default PromptCardList;
