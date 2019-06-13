import React from 'react';
import { StyledMenuItem } from './Menu.styles';

export interface MenuItemProps {
  className?: string;
  children: React.ReactNode;
  hasChildren: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  hasChildren = false,
  ...props
}) => {
  return <StyledMenuItem {...props}>{children}</StyledMenuItem>;
};

export default MenuItem;
