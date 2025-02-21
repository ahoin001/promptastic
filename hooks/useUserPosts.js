import { useQuery } from "@tanstack/react-query";

const fetchUserPosts = async (userId) => {
  const response = await fetch(`/api/users/${userId}/posts`);
  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(errorDetails.message || "Problem fetching posts");
  }
  return response.json();
};

export const useUserPosts = (userId) => {
  return useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!userId, // Only fetch if the user is available
  });
};
