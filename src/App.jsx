import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./routes";
import CustomThemeProvider from "./components/theme/ThemeContext";

export default function App() {
  return (
    <CustomThemeProvider>
      <RouterProvider router={Routes} />
    </CustomThemeProvider>
  );
}
