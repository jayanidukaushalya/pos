import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Root from "../components/root";
import Register from "../components/auth/Register";

const ROOT = "/";
const LOGIN = "/login";
const REGISTER = "/register";
// const PROTECTED = "/protected";
// const DASHBOARD = "/dashboard";

const Routes = createBrowserRouter([
  { path: ROOT, element: <Root /> },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
]);

export { Routes, ROOT, LOGIN, REGISTER };
