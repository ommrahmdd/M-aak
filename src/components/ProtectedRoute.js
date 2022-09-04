import React from "react";
import { Redirect, Route } from "react-router-dom";
import Login from "../pages/login/Login";
export default function ProtectedRoute(props) {
  return localStorage.getItem("Ma3akToken") ? (
    <Redirect to="/" />
  ) : (
    <Route {...props} />
  );
}
