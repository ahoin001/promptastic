"use client";

import PromptCardList from "@components/Prompt/PromptCardList";
import { usePosts } from "@hooks/usePosts";
import { usePostFilters } from "@hooks/usePostFilters";
import PostFilters from "./PostFilters";

const Feed = () => {
  const {
    search,
    sort,
    tag: selectedTag,
    updateQueryParams,
  } = usePostFilters();

  const { data: posts = [], isPending } = usePosts(search, selectedTag, sort);

  return (
    <section className="mt-16">
      <PostFilters
        updateQueryParams={updateQueryParams}
        search={search}
        sort={sort}
        selectedTag={selectedTag}
      />

      <PromptCardList posts={posts} loading={isPending} />
    </section>
  );
};

export default Feed;
