import React from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
export default function PrivateRoute(props) {
  return localStorage.getItem("Ma3ak_user_id") ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
}
