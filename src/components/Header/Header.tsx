import React from 'react';
import TopNav from '../TopNav';
import {
  StyledHeader,
  StyledLink,
  StyledLogo,
  getStyledLogoContainer,
} from './Header.styles';
import { ThemeProps } from '@src/types';

const SiteTitle: React.FC = () => {
  return (
    <React.Fragment>
      <StyledLogo />
    </React.Fragment>
  );
};

const Header: React.FC<
  JSX.IntrinsicElements['div'] & {
    siteTitle: string;
    isHome?: boolean;
  }
> = ({ siteTitle = '', isHome = false }) => {
  const StyledLogoContainer = getStyledLogoContainer(isHome);
  return (
    <StyledHeader>
      <StyledLogoContainer>
        {isHome ? (
          <SiteTitle />
        ) : (
          <StyledLink to="/">
            <SiteTitle />
          </StyledLink>
        )}
      </StyledLogoContainer>
      <TopNav />
    </StyledHeader>
  );
};

export default Header;
