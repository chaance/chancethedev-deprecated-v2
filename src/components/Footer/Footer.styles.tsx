import styled from '@emotion/styled';
import { fullWidth, styleVars, breakpoint } from '@lib/style';

export const StyledFooter = styled.footer`
  ${fullWidth()};
  text-align: center;
  margin-bottom: calc(${styleVars.outerMargin} / 2);
  ${breakpoint('medium')} {
    margin-bottom: ${styleVars.outerMargin};
  }
`;

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.grays.s600};
`;
