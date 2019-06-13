import React from 'react';
import TopNav from '@components/TopNav';
import {
  StyledHeader,
  StyledLink,
  StyledLogo,
  getStyledLogoContainer,
} from './Header.styles';
import { ThemeProps } from '@lib/theme';

export interface HeaderProps {
  siteTitle: string;
  isHome?: boolean;
}

export type THeaderProps = JSX.IntrinsicElements['header'] & HeaderProps;

const SiteTitle: React.FC = () => {
  return (
    <React.Fragment>
      <StyledLogo />
    </React.Fragment>
  );
};

const Header: React.FC<THeaderProps> = ({
  siteTitle = '',
  isHome = false,
  ...props
}) => {
  const StyledLogoContainer = getStyledLogoContainer(isHome);
  return (
    <StyledHeader {...props}>
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
