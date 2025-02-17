"use client";

import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Skeleton, TextInput } from "@mantine/core";
import PromptCardList from "@components/Prompt/PromptCardList";

const fetchPosts = async ({ queryKey }) => {
  const [_key, { debouncedSearchValue }] = queryKey;

  try {
    const res = await fetch(`/api/prompt/all?query=${debouncedSearchValue}`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchValue] = useDebouncedValue(searchText, 400);

  const { data: posts = [], isPending } = useQuery({
    queryKey: ["posts", { debouncedSearchValue }],
    queryFn: fetchPosts,
    keepPreviousData: true, // Prevents UI flicker while fetching
  });

  const onSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <section className="feed">
        <form className="relative w-full flex-center">
          <TextInput
            radius="lg"
            size="lg"
            className="w-full"
            placeholder="Search for tag or user name"
            value={searchText}
            onChange={onSearchChange}
          />
        </form>

        <PromptCardList data={posts} loading={isPending} />
      </section>
    </>
  );
};

export default Feed;
