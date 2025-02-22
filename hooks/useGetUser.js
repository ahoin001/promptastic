import { useQuery } from "@tanstack/react-query";

export const useGetUser = (userId) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!userId,
    onError: (error) => {
      console.error("Error fetching user:", error);
    },
  });
};
