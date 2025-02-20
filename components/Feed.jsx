"use client";

import { Group, Select, TextInput } from "@mantine/core";
import PromptCardList from "@components/Prompt/PromptCardList";
import { usePosts } from "@hooks/usePosts";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTags } from "@hooks/useTags";

const Feed = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Use URL as state, easier refreshing, back and forth traversal and link sharing
  const search = searchParams.get("search") || "";
  const tag = searchParams.get("tag") || "";
  const sort = searchParams.get("sort") || "desc";

  const { data: posts = [], isPending } = usePosts(search, tag, sort);

  const { data: allTags = [] } = useTags();

  const formattedTags = [
    { value: "", label: "Any" },
    ...allTags.map((tag) => {
      return { value: tag.name, label: tag.name };
    }),
  ];

  const updateQueryParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
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
            data={formattedTags}
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

        <Group mt={32}>
          <PromptCardList data={posts} loading={isPending} />
        </Group>
      </section>
    </>
  );
};

export default Feed;
