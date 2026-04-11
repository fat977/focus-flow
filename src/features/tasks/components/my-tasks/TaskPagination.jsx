import { Pagination } from "@/components/ui";

export default function TasksPagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center my-8">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onChange}
        buttonClassName="px-4 py-2 rounded-md border border-primary-300 dark:border-primary-700 hover:bg-primary-200 dark:hover:bg-primary-800 transition"
        activeButtonClassName="bg-primary-500 text-white dark:bg-accent-600"
      />
    </div>
  );
}
