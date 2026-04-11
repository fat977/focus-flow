import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../../context/theme/hooks/useTheme";
import { Button } from "@/components/ui/Buttons";
import { useSelector } from "react-redux";

function ToggleDarkMode() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  return (
    <Button
      onClick={toggleDarkMode}
      variant="secondary"
      fullWidth
      className="justify-between"
    >
      {!isCollapsed && (
        <div className="flex items-center pl-1 gap-3 text-(--grey-600)">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="text-sm font-medium ">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </div>
      )}
      <div className={`w-9 h-5 rounded-full bg-(--grey-700)  relative`}>
        <div
          className={`absolute top-1 w-3 h-3 rounded-full bg-(--grey-0) transition-all ${
            isDarkMode ? "right-1" : "left-1"
          }`}
        ></div>
      </div>
    </Button>
  );
}

export default ToggleDarkMode;
