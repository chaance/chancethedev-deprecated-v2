import React from 'react';
import SRT from '@components/SRT';
import { StyledMenuToggle } from './MenuToggle.styles';

export interface MenuToggleProps {
  menuActive: boolean;
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
  navId: string;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({
  menuActive,
  setMenuActive,
  navId,
}) => {
  return (
    <StyledMenuToggle
      onClick={() => setMenuActive(!menuActive)}
      aria-expanded={menuActive}
      aria-controls={navId}
    >
      {[1, 2, 3, 4].map((_, i) => (
        <span key={i} className="toggle-bar" aria-hidden />
      ))}
      <SRT>Toggle Navigation</SRT>
    </StyledMenuToggle>
  );
};

export default MenuToggle;
