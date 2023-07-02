import React from "react";

import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth-service";

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
  BoxIcons,
  GapComponents,
} from "./header.style";

import ThemeContext from "../../utils/themecontext";

export default function Header() {
  const toogleTheme = React.useContext(ThemeContext);

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const user = JSON.parse(sessionStorage.getItem("token"));

  const Navigate = useNavigate();

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    toogleTheme();
  };

  const logOut = () => {
    AuthService.logout();
    sessionStorage.removeItem("isDarkMode");
    window.location.reload();
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
          <BoxIcons onClick={handleThemeToggle}>
            {isDarkMode ? (
              <MoonIcon width={16} height={16} />
            ) : (
              <SunIcon width={16} height={16} />
            )}
          </BoxIcons>
          <GapComponents gapX="5px" />
          <DividerVerticalIcon width={24} height={24} />
          <GapComponents gapX="5px" />
        </Box>
        <Box>
          <GapComponents gapX="5px" />
          <AvatarIcon width={24} height={24} />
          <GapComponents gapX="10px" />
          <p>{user.user}</p>
          <GapComponents gapX="10px" />
          <DividerVerticalIcon width={24} height={24} />
        </Box>
        <Box>
          <GapComponents gapX="5px" />
          <BoxIcons onClick={logOut}>
            <ExitIcon width={16} height={16} />
          </BoxIcons>
          <GapComponents gapX="20px" />
        </Box>
      </HeaderComponents>
    </HeaderContainer>
  );
}
