import * as React from 'react';
import { GatsbyLinkProps } from 'gatsby-link';

export interface LinkProps extends GatsbyLinkProps<{}> {}

export interface MenuItemData {
  id: string | number;
  href?: string;
  label: string;
  options?: {
    target?: string;
    className?: string;
    hideLabel?: boolean;
  };
  children?: MenuItem[];
  redirect?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export class MenuItem extends React.Component<
  MenuItemProps & React.HTMLProps<HTMLLIElement>
> {}

export class MenuLink extends React.Component<MenuLinkProps & LinkProps> {}

export interface MenuItemProps {
  className?: string;
  children: React.ReactNode;
  hasChildren: boolean;
}

export type MLP = Omit<Omit<LinkProps, 'to'>, 'onClick'> &
  JSX.IntrinsicElements['button'];

export interface MenuLinkProps extends MLP {
  href?: string;
  label: string | JSX.Element;
  redirect?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export interface MenuProps {
  className?: string;
  items: MenuItemData[];
}
