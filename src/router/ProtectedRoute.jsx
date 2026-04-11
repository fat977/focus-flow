import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import {Spinner} from "@/components/ui";

function ProtectedRoute() {
  const { isAuthenticated, isInitialLoading } = useSelector(
    (state) => state.auth
  );
  if (isInitialLoading) {
    return <Spinner />
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
