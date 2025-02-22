"use client";

import { Group, Select, TextInput } from "@mantine/core";
import PromptCardList from "@components/Prompt/PromptCardList";
import { usePosts } from "@hooks/usePosts";
import { usePostFilters } from "@hooks/usePostFilters";
import { useTags } from "@hooks/useTags";

const Feed = () => {
  const { search, sort, tag, updateQueryParams } = usePostFilters();

  const { data: posts = [], isPending } = usePosts(search, tag, sort);

  const { formattedTagsForSelect } = useTags();

  return (
    <div>
      <section className="mt-16">
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
            value={tag}
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

      <Group mt={32}>
        <PromptCardList posts={posts} loading={isPending} />
      </Group>
    </div>
  );
};

export default Feed;
