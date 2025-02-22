import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { Group, Loader, SimpleGrid, Text, Transition } from "@mantine/core";

const PromptCardList = ({ posts, loading }) => {
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    if (!loading) {
      setShowGrid(false); // Hide first
      setTimeout(() => setShowGrid(true), 100); // Delay to trigger transition
    }
  }, [loading, posts]);

  return (
    <div>
      {loading ? (
        <Group justify="center">
          <Loader />
        </Group>
      ) : posts.length ? (
        <Transition
          key={JSON.stringify(posts)} // Force re-mount when posts change
          mounted={showGrid}
          transition="fade-up"
          duration={500}
          timingFunction="ease-in-out"
        >
          {(styles) => (
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 3 }}
              className="space-y-68"
              style={styles}
            >
              {posts.map((post) => (
                <PromptCard key={post._id} post={post} />
              ))}
            </SimpleGrid>
          )}
        </Transition>
      ) : (
        <Text ta="center">No posts found</Text>
      )}
    </div>
  );
};

export default PromptCardList;
