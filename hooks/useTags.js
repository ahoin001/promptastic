import { useQuery } from "@tanstack/react-query";

export const useTags = () => {
  const { data: allTags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await fetch(`/api/tags/all`);
      return response.json();
    },
  });

  const formattedTagsForSelect = [
    { value: "", label: "Any" },
    ...allTags.map((tag) => {
      return { value: tag.name, label: tag.name };
    }),
  ];

  return {
    allTags,
    formattedTagsForSelect,
  };
};
