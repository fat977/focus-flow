import { useMemo, useState } from "react";
import { useDebounce } from "../../../../../hooks/useDebounce";

export function useGlobalSearch({ boards=[],  tasks=[] }) {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 300);
const isSearching = query !== debouncedQuery;

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const q = debouncedQuery.toLowerCase();

    return [
      ...boards
        .filter((b) => b.title.toLowerCase().includes(q))
        .map((b) => ({ type: "board", data: b })),
     
      ...tasks
        .filter((t) => t.title.toLowerCase().includes(q))
        .map((t) => ({ type: "task", data: t })),
    ];
  }, [debouncedQuery, boards, tasks]);
  return {
    query,
    setQuery,
    results,
    isSearching
  };
}
