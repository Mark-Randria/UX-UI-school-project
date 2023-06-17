import { ThemeProvider } from "styled-components";
import React from "react";

import theme from "../core/theme/light";
import darkTheme from "../core/theme/dark";

import ThemeContext from "./themecontext";

function WithTheme({ children }) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const themeswitch = isDarkMode ? darkTheme : theme;

  const handleThemeToogle = () => {
    setIsDarkMode(!isDarkMode);
    sessionStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
  };

  React.useEffect(() => {
    const currentTheme = JSON.parse(
      sessionStorage.getItem("isDarkMode") || "false"
    );
    if (currentTheme) {
      setIsDarkMode(currentTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={handleThemeToogle}>
      <ThemeProvider theme={themeswitch}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default WithTheme;
