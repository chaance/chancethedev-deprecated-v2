import React from 'react';

import SRT from '../SRT';
import { isValidUrl } from '../../lib/utils';
import {
  StyledMenu,
  StyledSubmenu,
  StyledMenuItem,
  StyledMenuAnchor,
  StyledMenuButton,
  StyledMenuLink,
} from './Menu.styles';
import {
  MenuItemData,
  MenuItemProps,
  MenuLinkProps,
  MenuProps,
} from './index.d';

//const noop = () => {};

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

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  hasChildren = false,
  ...props
}) => {
  return <StyledMenuItem {...props}>{children}</StyledMenuItem>;
};

const Menu: React.FC<MenuProps> = ({ items, ...props }) => {
  const renderSubMenu = (subItems: MenuItemData[]) => {
    if (subItems && subItems.length) {
      return <StyledSubmenu>{renderMenuItems(subItems)}</StyledSubmenu>;
    }
  };

  const renderMenuItems = (items: MenuItemData[]) =>
    items.map(item => {
      const {
        id,
        href,
        options = {},
        children = [] as any,
        onClick,
        redirect,
      } = item;
      const { target, className, hideLabel } = options;

      return (
        <MenuItem
          className={className}
          key={id}
          hasChildren={!!(children && children.length)}
        >
          <MenuLink
            onClick={onClick}
            redirect={redirect}
            href={href}
            label={hideLabel ? <SRT>{item.label}</SRT> : item.label}
            target={target}
          />
          {renderSubMenu(children)}
        </MenuItem>
      );
    });
  return <StyledMenu {...props}>{renderMenuItems(items)}</StyledMenu>;
};

export default Menu;
