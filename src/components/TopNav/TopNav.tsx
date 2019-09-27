import React, { useState } from 'react';
import { MenuItemData } from '$components/Menu';
import MenuToggle from '$components/MenuToggle';
import { TOP_NAV_MENU } from '$lib/constants';
import { useMediaLayout, useTheme, useId } from '$lib/hooks';
import { ThemeProps } from '$lib/types';
import { StyledNav, StyledMenu } from './TopNav.styles';

// TODO: Implement some kind of focus management so that the user can tab back to the toggle button after they finish tabbing through the nav menu.

const MENU_ITEMS: MenuItemData[] = TOP_NAV_MENU.map((item, i) => ({
  ...item,
  id: i + 1,
  options: { target: '_blank' },
}));

export interface TopNavProps {}

const TopNav: React.FC<TopNavProps> = ({ children, ...props }) => {
  const navId = `top-nav-${useId()}`;
  const theme = useTheme() as ThemeProps;
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const mediumScreen = theme.breakpoints.medium || 640;
  const isSmall = useMediaLayout({ maxWidth: mediumScreen - 1 }, false);
  return (
    <React.Fragment>
      {isSmall ? (
        <MenuToggle
          menuActive={menuActive}
          setMenuActive={setMenuActive}
          navId={navId}
        />
      ) : null}
      <StyledNav {...props} menuActive={menuActive} id={navId}>
        <StyledMenu
          items={MENU_ITEMS}
          togglable={isSmall}
          isActive={menuActive}
        />
      </StyledNav>
    </React.Fragment>
  );
};

export default TopNav;
