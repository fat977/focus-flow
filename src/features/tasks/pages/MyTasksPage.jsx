import { useState } from "react";
import { useSelector } from "react-redux";
import { getFilteredTasks } from "../../../utils/filterTasks";
import { sortTasks } from "../../../utils/sortTasks";
import { useBoards } from "../../boards/hooks/useBoards";
import { useDashboard } from "../../dashboard/hooks/useDashboard";
import FilterPanel from "../components/filters/FilterPanel";
import MyTasksHeader from "../components/my-tasks/MyTasksHeader";
import TasksPagination from "../components/my-tasks/TaskPagination";
import TasksList from "../components/my-tasks/TasksList";
import TasksToolbar from "../components/my-tasks/TasksToolbar";
import SortPanel from "../components/sort/SortPanel";
import { useTaskFilters } from "../hooks/useTaskFilters";
import { useTasks } from "../hooks/useTasks";

export default function MyTasks() {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const { searchParams, setSearchParams, updateParams } = useTaskFilters();
  // قراءة القيم من الـ URL (ووضع قيم افتراضية لو مش موجودة)
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "dueDate";
  const searchQuery = searchParams.get("search") || "";
  const itemsPerPage = 6;

  // حالة الفلاتر الثلاثة
  const filters = {
    priority: searchParams.get("priority") || "all",
    board: searchParams.get("board") || "all",
    date: searchParams.get("date") || "all",
  };

  // استخراج أسماء البوردات الفريدة لعرضها في القائمة
  const userId = useSelector((state) => state.auth.user?.uid);
  const { data: tasks, isLoading } = useTasks(userId);
  const { data: stats } = useDashboard(userId);

  const { data: boards } = useBoards(userId);
  const uniqueBoards = boards?.map((b) => b.title) || [];

  const filteredTasks = getFilteredTasks(tasks, filters, searchQuery) || [];
  // items
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const sortedTasks = sortTasks(filteredTasks, sortBy);
  const currentItems = sortedTasks?.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredTasks?.length / itemsPerPage);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <MyTasksHeader total={stats?.totalTasksCount} />

      {/* Search / Filter / Sort */}
      <TasksToolbar
        searchQuery={searchQuery}
        onSearch={(value) => updateParams("search", value)}
        onToggleFilter={() => setShowFilter((v) => !v)}
        onToggleSort={() => setShowSort((v) => !v)}
      />

      {/* Filter Panel */}
      {showFilter && (
        <FilterPanel
          filters={filters}
          uniqueBoards={uniqueBoards}
          sortBy={sortBy}
          showSort={showSort}
          onChange={updateParams}
          onClear={() => setSearchParams(new URLSearchParams())}
        />
      )}

      {showSort && <SortPanel sortBy={sortBy} onChange={updateParams} />}

      {/* Tasks */}
      <TasksList currentItems={currentItems} />

      <TasksPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={(page) => updateParams("page", page)}
      />
    </div>
  );
}
