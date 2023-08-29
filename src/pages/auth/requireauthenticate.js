import React, { useEffect, useState } from "react";
import { useAuth } from "./authenticate";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  // const user = localStorage.getItem("username");
  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("Users")) || []
  );

  const authenticatedUser = localData.find((userData) => {
    if (userData.login_status === "login") {
      return "login";
    }
  });

  if (!authenticatedUser) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the provided children (route content)
  return children;
};