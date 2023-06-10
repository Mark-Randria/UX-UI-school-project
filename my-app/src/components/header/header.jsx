import React from "react";

import {
  SunIcon,
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

import Button from "../buttons/button";

import ThemeContext from "../../utils/themecontext";

export default function Header() {

    const ToogleTheme = React.useContext(ThemeContext);

    console.log(ToogleTheme);

  return (
    <HeaderContainer>
      <LogoContainer>
        <div>Easy-Schedule</div>
      </LogoContainer>
      <HeaderComponents>
        <Box>
          <SunIcon width={16} height={16} onClick={ToogleTheme}/>
          <GapComponents gapX="5px" />
          <DividerVerticalIcon width={32} height={32} />
          <GapComponents gapX="5px" />
        </Box>
        <Box>
          <GapComponents gapX="5px" />
          <AvatarIcon width={24} height={24} />
          <GapComponents gapX="10px" />
          <p>RANDRIA Mark</p>
          <GapComponents gapX="10px" />
          <DividerVerticalIcon width={32} height={32} />
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
