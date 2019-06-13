import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { fullWidth, styleVars, breakpoint } from '@lib/style';
import SiteLogo from '@components/SiteLogo';

export const StyledLogo = styled(SiteLogo)`
  display: block;
  height: 38px;
  ${breakpoint('medium')} {
    height: 44px;
  }
`;

export const StyledLink = styled(Link)`
  display: block;
  color: unset;
  text-decoration: none;
`;

export const StyledHeader = styled.header`
  ${fullWidth()};
  display: grid;
  grid-template-columns: 200px auto;
  gap: 0.9375rem;
  align-items: center;
  justify-content: space-between;
  margin-top: calc(${styleVars.outerMargin} / 2);
  ${breakpoint('medium')} {
    margin-top: ${styleVars.outerMargin};
    grid-template-columns: 230px auto;
  }
`;

export const getStyledLogoContainer = (isHeading = false) => styled[
  isHeading ? 'h1' : 'div'
]`
  display: block;
  margin: 0;
  font: unset;
`;
