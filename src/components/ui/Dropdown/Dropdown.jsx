import { useState } from "react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

const Dropdown = ({
  trigger,
  children,
  align = "bottom-right",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));
  const alignmentClasses = {
    "bottom-right": "top-full right-0 mt-2",
    "bottom-left": "bottom-full left-1",
    "top-right": "bottom-full right-0 mb-2",
    "top-left": "bottom-full left-0 mb-2",
  };
  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {/* content */}
      {isOpen && (
        <div
          className={`absolute z-100 min-w-40 bg-(--grey-0) border border-(--grey-200) rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${alignmentClasses[align]}`}
        >
          <div onClick={() => setIsOpen(false)}>{children}</div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
