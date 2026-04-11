import { Button } from "@/components/ui/Buttons";

export default function FilterOption({ label, onClick, isActive }) {
  return (
    <Button
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm transition-colors ${
        isActive
          ? "bg-(--brand-600) text-(--text-on-buttons)"
          : "bg-(--grey-200) text-(--grey-700) hover:bg-(--grey-300)"
      }`}
    >
      {label}
    </Button>
  );
}
