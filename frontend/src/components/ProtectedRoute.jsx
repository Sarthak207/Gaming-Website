import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>; // Show a loading state while Clerk is initializing
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;