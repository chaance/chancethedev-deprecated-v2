import styled from '@emotion/styled';
// import { Link } from 'gatsby';
import { /* fullWidth, */ styleVars, breakpoint as bp } from '@lib/style';
import Menu from '@components/Menu';

export const StyledNav: any = styled.nav`
  ${bp('small down')} {
    z-index: 10;
    background: #fff;
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 100%;
    top: 0;
    padding: calc(${styleVars.outerMargin} / 2);
    transition: transform 300ms ease-out;
    transform: translateX(
      ${({ menuActive }: any) => (menuActive ? '-100%' : '0')}
    );
  }

  ${bp('medium')} {
    position: relative;
  }
`;

export const MenuToggle: any = styled.button`
  z-index: 11;
`;

export const StyledMenu: any = styled(Menu)`
  display: grid;
  grid-template: auto / auto;
  grid-row-gap: 20px;
  ${bp('medium')} {
    display: flex;
  }
`;
