import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function PrivateRoute({ element, isAdmin }) {

  const { user } = useContext(AuthContext);

  // If user not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If admin route but user is not admin
  if (isAdmin && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return element;
}