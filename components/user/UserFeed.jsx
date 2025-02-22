"use client";

import { useUserPosts } from "@hooks/useUserPosts";
import { usePostFilters } from "@hooks/usePostFilters";
import { useTags } from "@hooks/useTags";

import { Group, Loader, Select, Text, TextInput } from "@mantine/core";
import PromptCardList from "@components/Prompt/PromptCardList";

const UserFeed = ({ userId }) => {
  const {
    search,
    sort,
    tag: selectedTag,
    updateQueryParams,
  } = usePostFilters();

  const { formattedTagsForSelect } = useTags();

  const { data: posts = [], isPending } = useUserPosts(userId, {
    search,
    sort,
    selectedTag,
  });

  return (
    <div>
      {isPending ? (
        <Group justify="center">
          <Loader />
        </Group>
      ) : (
        <>
          <section className="mt-16 mb-8">
            <form className="relative w-full max-w-xl mx-auto">
              <TextInput
                radius="lg"
                size="lg"
                className="w-full"
                placeholder="Search for tag or user name"
                defaultValue={search}
                onChange={(e) => updateQueryParams("search", e.target.value)}
              />
            </form>

            <Group mt={16}>
              <Select
                label="Tag"
                value={selectedTag}
                onChange={(value) => updateQueryParams("tag", value)}
                data={formattedTagsForSelect}
                clearable
              />

              <Select
                label="Time"
                value={sort}
                onChange={(value) => updateQueryParams("sort", value)}
                data={[
                  { value: "desc", label: "Latest" },
                  { value: "asc", label: "Oldest" },
                ]}
                clearable
              />
            </Group>
          </section>

          {/* Correctly positioned second ternary statement */}
          {posts.length ? (
            <PromptCardList data={posts} />
          ) : (
            <Text ta="center">No posts found</Text>
          )}
        </>
      )}
    </div>
  );
};

export default UserFeed;
