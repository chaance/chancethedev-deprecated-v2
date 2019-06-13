import React, { useState } from 'react';
import { MenuItemData } from '@components/Menu';
import { TOP_NAV_MENU } from '@lib/constants';
import { StyledNav, StyledMenu, MenuToggle } from './TopNav.styles';
import { useMediaLayout, useTheme } from '@lib/hooks';
import { ThemeProps } from '@lib/types';

const MENU_ITEMS: MenuItemData[] = TOP_NAV_MENU.map((item, i) => ({
  ...item,
  id: i + 1,
  options: { target: '_blank' },
}));

export interface TopNavProps {}

const TopNav: React.FC<TopNavProps> = ({ children, ...props }) => {
  const theme = useTheme() as ThemeProps;
  const [menuActive, setMenuActive] = useState(false);
  const mediumScreen = theme.breakpoints.medium || 640;
  const isSmall = useMediaLayout({ maxWidth: mediumScreen - 1 }, false);
  return (
    <React.Fragment>
      <StyledNav {...props} menuActive={menuActive}>
        <StyledMenu items={MENU_ITEMS} />
      </StyledNav>
      {isSmall ? (
        <MenuToggle onClick={() => setMenuActive(!menuActive)}>OK</MenuToggle>
      ) : null}
    </React.Fragment>
  );
};

export default TopNav;
