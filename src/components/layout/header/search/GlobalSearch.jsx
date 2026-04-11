import { Search } from "lucide-react";
import { useGlobalSearch } from "./hooks/useGlobalSearch";
import { SearchResultItem } from "./SearchResultItem";
import {Input } from "@/components/ui";

export default function GlobalSearch({ boards, tasks }) {
  const { query, setQuery, results, isSearching } = useGlobalSearch({
    boards,
    tasks,
  });

  return (
    <div className="w-80 relative">
      <div className="flex items-center gap-2 rounded-lg">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks, boards..."
          startIcon={<Search size={18} />}
          className="
    bg-(--grey-100)
    border-none
    text-(--grey-400)
    placeholder:text-(--grey-400)
  "
        />
      </div>

      {isSearching && (
        <div className="absolute top-full mt-2 w-full text-xs text-(--grey-400)">
          Searching...
        </div>
      )}
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-(--grey-0) rounded-lg shadow-xl max-h-80 overflow-auto z-50 border border-(--grey-200)">
          {results.map((item) => (
            <SearchResultItem
              key={`${item.type}-${item.data.id}`}
              item={item}
              onCloseSearch={() => setQuery("")} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
