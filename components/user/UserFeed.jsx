"use client";

import PromptCardList from "@components/Prompt/PromptCardList";
import { useUserPosts } from "@hooks/useUserPosts";
import { usePostFilters } from "@hooks/usePostFilters";
import PostFilters from "@components/PostFilters";

const UserFeed = ({ userId }) => {
  const {
    search,
    sort,
    tag: selectedTag,
    updateQueryParams,
  } = usePostFilters();

  const {
    data: posts = [],
    isPending,
    refetch: refetchPosts,
  } = useUserPosts(userId, {
    search,
    sort,
    selectedTag,
  });

  return (
    <section>
      <PostFilters
        updateQueryParams={updateQueryParams}
        search={search}
        sort={sort}
        selectedTag={selectedTag}
      />

      <PromptCardList
        refetchPosts={refetchPosts}
        posts={posts}
        loading={isPending}
      />
    </section>
  );
};

export default UserFeed;
