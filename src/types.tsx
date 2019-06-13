export interface ColorProps {
  [key: string]: string | object | null | undefined;
}

export interface ThemeBrandProps {
  primary: string;
  primaryDark: string;
  secondary: string;
  secondaryDark: string;
  white: string;
  black: string;
  [key: string]: string;
}

export interface ThemeFontProps {
  primary: string;
  sans?: string;
  serif?: string;
  cond?: string;
  mono?: string;
}

export interface ThemeModeProps {
  background: {
    main: string;
  };
  text: {
    main: string;
  };
  button: {
    default: {
      background: string;
      backgroundHover?: string;
      text: string;
      textHover?: string;
    };
    primary: {
      background: string;
      backgroundHover?: string;
      text: string;
      textHover?: string;
    };
    secondary: {
      background: string;
      backgroundHover?: string;
      text: string;
      textHover?: string;
    };
  };
}

export interface ThemeBPProps {
  [key: string]: number;
}

export interface ThemeProps extends ColorProps {
  mode: 'light' | 'dark';
  light: ThemeModeProps;
  dark: ThemeModeProps;
  brand: ThemeBrandProps;
  fonts: ThemeFontProps;
  breakpoints: ThemeBPProps;
}
