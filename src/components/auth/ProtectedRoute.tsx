import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode | ((props: { user: { id: string; name: string; email: string; role: "patient" | "doctor" | "admin" } }) => React.ReactNode);
  allowedRoles?: ("patient" | "doctor" | "admin")[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (typeof children === "function") {
    return <>{children({ user })}</>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;