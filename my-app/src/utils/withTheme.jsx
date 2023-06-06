import { ThemeProvider } from 'styled-components';
import React from 'react';


function WithTheme({ children }){
  const [ isDarkMode, setIsDarkMode ] = React.useState(false);

  const themeswitch = (isDarkMode ? DarkTheme : LightTheme );

  const handleThemeToogle = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode))
  };

  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem('isDarkMode') || 'false');
    if (currentTheme) {
      setIsDarkMode(currentTheme);
    }
  }, []);

  return (
    <ThemeProvider theme={themeswitch}>
      {children}
    </ThemeProvider>
  );
}

export default WithTheme;