import React from 'react';
import { GatsbyLinkProps } from 'gatsby-link';
import { isValidUrl } from '$lib/utils';
import {
  StyledMenuAnchor,
  StyledMenuButton,
  StyledMenuLink,
} from './Menu.styles';

type TMenuLinkProps = Omit<Omit<GatsbyLinkProps<{}>, 'to'>, 'onClick'> &
  JSX.IntrinsicElements['button'];

export interface MenuLinkProps extends TMenuLinkProps {
  href?: string;
  label: string | JSX.Element;
  redirect?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  href,
  target,
  label,
  onClick,
  rel,
  redirect,
  ...props
}) => {
  if (onClick) {
    return (
      <StyledMenuButton onClick={onClick} {...props}>
        {label}
      </StyledMenuButton>
    );
  }
  if (href) {
    const hrefIsUrl = isValidUrl(href);
    return hrefIsUrl ? (
      <StyledMenuAnchor
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        {...props}
      >
        {label}
      </StyledMenuAnchor>
    ) : (
      <StyledMenuLink
        to={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        {...props}
      >
        {label}
      </StyledMenuLink>
    );
  }
  return <span {...props}>{label}</span>;
};

export default MenuLink;
