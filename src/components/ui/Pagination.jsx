import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Buttons";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Prev Button */}
      <Button
      variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-xl border transition-all duration-200 ${
          currentPage === 1 
            ? 'border-white/5 text-gray-600 cursor-not-allowed' 
            : 'border-white/10 text-gray-300 hover:bg-white/5 hover:border-teal-500/50'
        }`}
      >
        <ChevronLeft size={20} />
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2  p-1 rounded-2xl">
        {pageNumbers.map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 justify-center  ${
              currentPage === page 
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' 
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      <Button
      variant="secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-xl border transition-all duration-200 ${
          currentPage === totalPages 
            ? 'border-white/5 text-gray-600 cursor-not-allowed' 
            : 'border-white/10 text-gray-300 hover:bg-white/5 hover:border-teal-500/50'
        }`}
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  );
}