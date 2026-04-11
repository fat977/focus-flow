import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutButton } from "@/components/ui";
import { Button } from "@/components/ui";
import { useTheme } from "./context/theme/hooks/useTheme";

function App() {
  const user = useSelector((state) => state.auth.user);
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <div className="min-h-screen bg-(--grey-50) text-(--grey-900)">
      <div>
        <h1 className="text-3xl text-(--danger) font-bold underline">
          Hello world!
        </h1>
        <span className="text-sm font-semibold  truncate">
          {user?.displayName || "User Name"}
        </span>
        <LogoutButton className="w-full justify-start gap-3 px-3 py-2rounded-lg transition-colors flex items-center" />
        <Button onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
