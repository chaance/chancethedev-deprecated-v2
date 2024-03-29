import React from 'react';
import { StyledFooter, StyledLink } from './Footer.styles';

const Footer: React.FC<JSX.IntrinsicElements['footer']> = props => {
  return (
    <StyledFooter {...props}>
      <p>
        © {new Date().getFullYear()}{' '}
        <StyledLink
          href="https://chancedigital.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chance Digital
        </StyledLink>
      </p>
      <p>
        <StyledLink
          href="https://www.gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          GatsbyJS
        </StyledLink>{' '}
        |{' '}
        <StyledLink
          href="https://github.com/chancestrickland/chancethedev"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </StyledLink>
      </p>
    </StyledFooter>
  );
};

export default Footer;
