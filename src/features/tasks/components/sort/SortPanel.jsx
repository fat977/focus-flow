import FilterGroup from "../filters/FilterGroup";
import FilterOption from "../filters/FilterOption";

export default function SortPanel({ sortBy, onChange }) {
  return (
    <FilterGroup title="Sort by">
      <FilterOption
        label="Due Date"
        isActive={sortBy === "dueDate"}
        onClick={() => onChange("sortBy", "dueDate")}
      />
      <FilterOption
        label="Priority"
        isActive={sortBy === "priority"}
        onClick={() => onChange("sortBy", "priority")}
      />
      <FilterOption
        label="Project Name"
        isActive={sortBy === "board"}
        onClick={() => onChange("sortBy", "board")}
      />
    </FilterGroup>
  );
}
