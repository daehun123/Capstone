import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    toast.error("로그인 후 이용가능합니다.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
