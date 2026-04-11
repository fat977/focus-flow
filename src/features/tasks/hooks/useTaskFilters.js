import { useSearchParams } from "react-router-dom";

// hooks/useTaskFilters.js
export function useTaskFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all" || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    if (key !== "page") newParams.set("page", "1");
    setSearchParams(newParams);
  };

  return { searchParams,setSearchParams, updateParams };
}