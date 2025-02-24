import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch all tags or use formatted tags for select.
 *
 * This hook uses the `useQuery` hook from React Query to fetch all tags from the `/api/tags/all` endpoint.
 * It returns the raw tags data and a formatted version suitable for use in a select input.
 *
 * @returns {Object} An object containing:
 * - `allTags` {Array<Object>} - The raw tags data fetched from the API.
 * - `formattedTagsForSelect` {Array<Object>} - The tags formatted for use in a select input, with each tag having `value` and `label` properties.
 */
export const useTags = () => {
  const { data: allTags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await fetch(`/api/tags/all`);
      return response.json();
    },
  });

  const formattedTagsForSelect = [
    ...allTags.map((tag) => {
      return { value: tag.name, label: tag.name };
    }),
  ];

  return {
    allTags,
    formattedTagsForSelect,
  };
};
