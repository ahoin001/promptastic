import PromptCard from "./PromptCard";
import { Group, Loader, SimpleGrid, Stack, Text } from "@mantine/core";

const PromptCardList = ({ data, loading, handleTagClick }) => {
  if (loading) {
    return (
      <Group justify="center">
        <Loader size="xl" />
      </Group>
    );
  }

  return (
    <div>
      {data.length ? (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} className="space-y-68">
          {data.map((post) => {
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
