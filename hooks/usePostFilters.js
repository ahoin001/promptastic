import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const usePostFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Use URL as state, easier refreshing, back and forth traversal and link sharing
  const search = searchParams.get("search") || "";
  const tag = searchParams.get("tag") || "";
  const sort = searchParams.get("sort") || "desc";

  const updateQueryParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return {
    search,
    sort,
    tag,
    updateQueryParams,
  };
};
