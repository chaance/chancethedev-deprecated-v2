import React from 'react';
import SRT from '@components/SRT';
import { StyledMenu, StyledSubmenu } from './Menu.styles';
import MenuLink from './MenuLink';
import MenuItem from './MenuItem';

export interface MenuItemData {
  id: string | number;
  href?: string;
  label: string;
  options?: {
    target?: string;
    className?: string;
    hideLabel?: boolean;
  };
  children?: MenuItemData[];
  redirect?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export interface MenuProps {
  className?: string;
  items: MenuItemData[];
}

const Menu: React.FC<MenuProps> = ({ items, ...props }) => {
  const renderSubMenu = (subItems: MenuItemData[]) => {
    if (subItems && subItems.length) {
      return <StyledSubmenu>{renderMenuItems(subItems)}</StyledSubmenu>;
    }
    return null;
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
