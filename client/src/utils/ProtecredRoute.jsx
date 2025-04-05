import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/userContext";

function ProtectedRoute() {
   const { user, isLoading } = useAuth();

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
