import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Buttons";

export default function SettingsDropdown({
  label,
  icon,
  options = [],
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="flex items-center justify-between w-full ">

      <div className="flex items-center gap-3 ">
        {icon}
        <label className="text-sm  font-medium">{label}</label>
      </div>

      <div className="relative" ref={ref}>
        <Button
        variant="secondary"
          onClick={() => setOpen(!open)}
         
        >
          <span>{selectedOption?.label || "Select..."}</span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>

        {open && (
          <div
            className="absolute top-full right-0 mt-2 w-full min-w-40 
                       rounded-xl bg-zinc-900 border border-zinc-700
                       shadow-2xl overflow-hidden z-100"
          >
            <div className="py-1">
              {options.map((option) => (
                <Button
                variant="secondary"
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm
                    hover:bg-zinc-800 transition
                    ${
                      option.value === value
                        ? "bg-zinc-800 text-blue-400 font-semibold"
                        : "text-gray-300"
                    }`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
