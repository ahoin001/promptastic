import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "@mantine/hooks";

export const usePosts = (searchText, selectedTag, sort) => {
  const [debouncedSearchValue] = useDebouncedValue(searchText, 400);

  return useQuery({
    queryKey: ["posts", { debouncedSearchValue, selectedTag, sort }],
    queryFn: fetchPosts,
    keepPreviousData: true,
  });
};

// Tanstack  docs suggest callbacks being done this way
const fetchPosts = async ({ queryKey }) => {
  const [_key, { debouncedSearchValue, selectedTag, sort }] = queryKey;

  try {
    const res = await fetch(
      `/api/prompt/all?search=${debouncedSearchValue}&tag=${selectedTag}&sort=${sort}`
    );
    if (!res.ok) throw new Error("Failed to fetch posts");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
