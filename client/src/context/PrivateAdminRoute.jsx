import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateAdminRoute = ({ children }) => {
  const { user } = useAuth();

if (!user || user.role !== "admin") {
  return <Navigate to="/" />;
}


  return children;
};

export default PrivateAdminRoute;
