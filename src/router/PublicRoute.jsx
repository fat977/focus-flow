/**
 * (Guest Routes) protects guest-only routes.
 *  Login و Register prevent authenticated users from accessing these routes.
 *
 * If the user is authenticated, they are redirected to the Dashboard.
 * If the authentication state is still loading, a Spinner is displayed.
 * Otherwise, the requested public route is rendered.
 */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/ui/Spinner";

const PublicRoute = () => {
  const { user, isInitialLoading } = useSelector((state) => state.auth);
  if (isInitialLoading) {
    return <Spinner />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
