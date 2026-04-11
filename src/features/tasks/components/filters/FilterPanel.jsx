import { Button } from "@/components/ui/Buttons";
import FilterGroup from "./FilterGroup";
import FilterOption from "./FilterOption";

export default function FilterPanel({
  filters,
  uniqueBoards,

  onChange,
  onClear,
}) {
  return (
    <div className="rounded-xl bg-(--grey-100) border border-(--grey-200) p-4 space-y-4">
      <FilterGroup title="Due date">
        <FilterOption
          label="Any time"
          isActive={filters.date === "all"}
          onClick={() => onChange("date", "all")}
        />
        <FilterOption
          label="Today"
          isActive={filters.date === "today"}
          onClick={() => onChange("date", "today")}
        />
        <FilterOption
          label="Upcoming"
          isActive={filters.date === "upcoming"}
          onClick={() => onChange("date", "upcoming")}
        />
      </FilterGroup>

      <FilterGroup title="Priority">
        <FilterOption
          label="All"
          isActive={filters.priority === "all"}
          onClick={() => onChange("priority", "all")}
        />
        <FilterOption
          label="High"
          isActive={filters.priority === "high"}
          onClick={() => onChange("priority", "high")}
        />
        <FilterOption
          label="Medium"
          isActive={filters.priority === "medium"}
          onClick={() => onChange("priority", "medium")}
        />
        <FilterOption
          label="Low"
          isActive={filters.priority === "low"}
          onClick={() => onChange("priority", "low")}
        />
      </FilterGroup>

      <FilterGroup title="Projects">
        <FilterOption
          label="All Projects"
          isActive={filters.board === "all"}
          onClick={() => onChange("board", "all")}
        />
        {uniqueBoards?.map((board) => (
          <FilterOption
            key={board}
            label={board}
            isActive={filters.board === board}
            onClick={() => onChange("board", board)}
          />
        ))}
      </FilterGroup>



      <div className="pt-2 border-t border-(--grey-200)">
        <Button
        variant="danger"
          onClick={onClear}
        >
          Clear all filters
        </Button>
      </div>
    </div>
  );
}
