import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/hooks/hooks";
import { initializeAuth } from "../Redux/Features/User/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const dispatch = useAppDispatch();
  const { userRole, isAuthenticated , loading} = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Check authentication and authorization only when loading is false
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login'); // Redirect to login if not authenticated
      } else if (requiredRole && userRole !== requiredRole) {
        navigate('/unauthorized'); // Redirect if the user doesn't have the required role
      }
    }
  }, [isAuthenticated, userRole, requiredRole, loading, navigate]);
  // Render children if authenticated and authorized
  if (!loading && isAuthenticated && (!requiredRole || userRole === requiredRole)) {
    return <>{children}</>;
  }

  // Optionally render a loading spinner while loading
  return loading ? <div>Loading...</div> : null;
}
