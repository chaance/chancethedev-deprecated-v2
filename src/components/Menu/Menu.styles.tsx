import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import { getMode, getButton } from '@lib/style';
import { ThemeProps } from '@src/types';

export const menuLinkStyles = (theme: ThemeProps) => css`
  color: ${getMode(theme).text.main};
  font-weight: 700;
  text-transform: uppercase;
  transition: 0.2s all;
  transform-origin: center;
  transform: scale(1);
  position: relative;
  background-color: transparent;
  border: 0;
  box-shadow: 0;
  appearance: none;

  &:after {
    position: absolute;
    left: 0;
    bottom: -10px;
    height: 3px;
    width: 100%;
    content: '';
    display: block;
    transition: 0.2s;
    transform-origin: left;
    transform: scaleX(0);
    background: ${theme.brand.secondary};
  }

  &:hover,
  &:focus,
  &:focus-within {
    display: inline-block;
    text-decoration: none;
    color: ${theme.brand.primary};
    transform: scale(1.15);
    outline: none;

    &:after {
      transform: scaleX(1);
    }
  }
`;

export const StyledMenu = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StyledSubmenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const StyledMenuItem = styled.li`
  margin: 0 10px;
  font-family: ${({ theme }) => theme.fonts.cond};
  font-size: 1.125rem;
`;

export const StyledMenuLink = styled(Link)`
  ${({ theme }) => menuLinkStyles(theme)};
`;

export const StyledMenuButton = styled.button`
  ${({ theme }) => menuLinkStyles(theme)};
`;

export const StyledMenuAnchor = styled.a`
  ${({ theme }) => menuLinkStyles(theme)};
`;
