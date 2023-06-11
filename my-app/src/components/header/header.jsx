import React from "react";

import {
  SunIcon,
  MoonIcon,
  ExitIcon,
  AvatarIcon,
  DividerVerticalIcon,
} from "@radix-ui/react-icons";

import {
  HeaderContainer,
  LogoContainer,
  HeaderComponents,
  Box,
  GapComponents,
} from "./header.style";

import ThemeContext from "../../utils/themecontext";

export default function Header() {
  const toogleTheme = React.useContext(ThemeContext);

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    toogleTheme();
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
    <HeaderContainer>
      <LogoContainer>
        <div>Easy-Schedule</div>
      </LogoContainer>
      <HeaderComponents>
        <Box>
          {isDarkMode ? (
            <MoonIcon width={16} height={16} onClick={handleThemeToggle} />
          ) : (
            <SunIcon width={16} height={16} onClick={handleThemeToggle} />
          )}
          <GapComponents gapX="5px" />
          <DividerVerticalIcon width={24} height={24} />
          <GapComponents gapX="5px" />
        </Box>
        <Box>
          <GapComponents gapX="5px" />
          <AvatarIcon width={24} height={24} />
          <GapComponents gapX="10px" />
          <p>RANDRIA Mark</p>
          <GapComponents gapX="10px" />
          <DividerVerticalIcon width={24} height={24} />
        </Box>
        <Box>
          <GapComponents gapX="5px" />
          <ExitIcon width={16} height={16} />
          <GapComponents gapX="20px" />
        </Box>
      </HeaderComponents>
    </HeaderContainer>
  );
}
