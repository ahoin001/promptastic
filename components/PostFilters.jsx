import { useTags } from "@hooks/useTags";
import { Group, Select, TextInput } from "@mantine/core";

const PostFilters = ({ search, selectedTag, sort, updateQueryParams }) => {
  const { formattedTagsForSelect } = useTags();

  return (
    <div>
      <form className="relative w-full max-w-xl mx-auto">
        <TextInput
          radius="lg"
          size="lg"
          className="w-full"
          placeholder="Search by prompt or tag"
          defaultValue={search}
          onChange={(e) => updateQueryParams("search", e.target.value)}
        />
      </form>

      <div className="mt-12 mb-8">
        <Group mt={16}>
          <Select
            placeholder="Choose tag to filter by"
            label="Tag"
            value={selectedTag}
            onChange={(value) => updateQueryParams("tag", value)}
            data={[{ value: "", label: "Any" }, ...formattedTagsForSelect]}
            clearable
          />

          <Select
            label="Time"
            value={sort}
            onChange={(value) => updateQueryParams("sort", value)}
            data={[
              { value: "desc", label: "Latest" },
              { value: "asc", label: "Oldest" },
            ]}
            clearable
          />
        </Group>
      </div>
    </div>
  );
};

export default PostFilters;
