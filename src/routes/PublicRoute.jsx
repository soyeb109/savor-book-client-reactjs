import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-dots loading-sm"></span>
      </div>
    );
  }

  if (user) {
    return <Navigate to={location.state?.from?.pathname || "/"} replace />;
  }

  return children;
};

export default PublicRoute;
