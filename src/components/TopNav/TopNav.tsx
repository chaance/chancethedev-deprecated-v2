import React, { useState } from 'react';
import { get as _get } from 'lodash';
import { MenuItemData } from '@components/Menu/index.d';
import { StyledNav, StyledMenu, MenuToggle } from './TopNav.styles';
import { useMediaLayout, useTheme } from '@lib/hooks';

const MENU_ITEMS: MenuItemData[] = [
  {
    label: 'RSS',
    href: 'https://feeds.buzzsprout.com/153232.rss',
  },
  {
    label: 'Pocket Casts',
    href: 'http://pca.st/Cye7',
  },
  {
    label: 'Stitcher',
    href: 'https://www.stitcher.com/s?fid=173075&refid=stpr',
  },
  {
    label: 'Spotify',
    href:
      'https://open.spotify.com/show/50hIkzVe6SHWEOc32wI6yd?si=f7XBveIkSIiti1E1OsnBBA',
  },
  {
    label: 'Google Play',
    href:
      'https://play.google.com/music/m/I4fuxk6xar5fgy2my2lqpwf7zwq?t=Chance_the_Developer_Podcast',
  },
  {
    label: 'iTunes',
    href:
      'https://itunes.apple.com/us/podcast/chance-the-developer-podcast/id1344502648?mt=2',
  },
].map((item, i) => ({
  ...item,
  id: i + 1,
  options: {
    target: '_blank',
  },
}));

const TopNav: React.FC = ({ children, ...props }) => {
  const theme: any = useTheme();
  const [menuActive, setMenuActive] = useState(false);
  const mediumScreen = _get(theme, 'breakpoints.medium') || 640;
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
