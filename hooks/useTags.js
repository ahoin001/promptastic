import { useQuery } from "@tanstack/react-query";

export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await fetch(`api/tags/all`);
      return response.json();
    },
  });
};
