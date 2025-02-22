import PromptCard from "./PromptCard";
import { Group, Loader, SimpleGrid, Text } from "@mantine/core";

const PromptCardList = ({ posts, loading, handleTagClick }) => {
  return (
    <div>
      {loading ? (
        <Group justify="center">
          <Loader />{" "}
        </Group>
      ) : posts.length ? (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} className="space-y-68">
          {posts.map((post) => {
            return (
              <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
              />
            );
          })}
        </SimpleGrid>
      ) : (
        <Text ta="center">No posts found</Text>
      )}
    </div>
  );
};

export default PromptCardList;
