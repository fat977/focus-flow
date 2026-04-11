import { ArrowUpDown, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/Buttons";
import Input from "../../../../components/ui/Input";

export default function TasksToolbar({
  searchQuery,
  onSearch,
  onToggleFilter,
  onToggleSort,
}) {
  return (
    <div className="flex items-center gap-3">
      {/* Search */}
      <div className="relative flex-1">
       
        <Input
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search tasks by title..."
          startIcon={<Search size={18} />}
        />
      </div>

      {/* Filter */}
      <Button
        onClick={onToggleFilter}
    
      >
        <Filter size={16} />
        Filter
      </Button>

      {/* Sort */}
      <Button
        onClick={onToggleSort}
       
      >
        <ArrowUpDown size={16} />
        Sort: Due date
      </Button>
    </div>
  );
}
