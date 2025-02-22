import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";

export const useUserPosts = (userId, { search, sort, selectedTag }) => {
  const [debouncedSearchValue] = useDebouncedValue(search, 400);

  return useQuery({
    queryKey: [
      "userPosts",
      { userId, debouncedSearchValue, sort, selectedTag },
    ],
    queryFn: fetchUserPosts,
    enabled: !!userId, // Only fetch if the user is available
  });
};

const fetchUserPosts = async ({ queryKey }) => {
  const [_key, { userId, debouncedSearchValue, selectedTag, sort }] = queryKey;

  console.log("query", queryKey);
  console.log("useerid", userId);
  console.log("selectedTag", selectedTag);
  console.log("debounc", debouncedSearchValue);

  const response = await fetch(
    `/api/users/${userId}/posts?search=${debouncedSearchValue}&tag=${selectedTag}&sort=${sort}`
  );
  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(errorDetails.message || "Problem fetching posts");
  }
  return response.json();
};
