import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const PublicOnlyRoute = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
