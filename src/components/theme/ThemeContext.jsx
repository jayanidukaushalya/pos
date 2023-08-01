/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useMode() {
  return useContext(ThemeContext);
}

export function useSetMode() {
  return useContext(ThemeUpdateContext);
}

export default function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState(false);

  function toggleTheme() {
    setMode((prevTheme) => !prevTheme);
    mode
      ? localStorage.setItem("beeCodeLabsTheme", "light")
      : localStorage.setItem("beeCodeLabsTheme", "dark");
  }

  const theme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  useEffect(() => {
    const beeCodeLabsTheme = localStorage.getItem("beeCodeLabsTheme");

    if (beeCodeLabsTheme == null) {
      const systemTheme =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      systemTheme ? setMode(true) : setMode(false);
    } else {
      beeCodeLabsTheme == "dark" ? setMode(true) : setMode(false);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={mode}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
