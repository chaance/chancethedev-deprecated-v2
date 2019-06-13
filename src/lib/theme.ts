import { lighten, darken } from 'polished';

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

export const black = '#363636';

export const white = '#ffffff';

export const hotPink = '#f64861';

export const limeGreen = '#e8f648';

export const blue = '#146eff';

export const fontSans = `'IBM Plex Sans', -apple-system, BlinkMacSystemFont,
    'Helvetica Neue', sans-serif`;

export const fontMono = `'IBM Plex Mono', 'Fira Sans', 'Droid Sans', monospace`;

export const fontCond = `'Pragati Narrow', 'Impact', -apple-system, BlinkMacSystemFont,
    'Helvetica Neue', sans-serif`;

export const breakpoints: ThemeBPProps = {
  small: 0,
  medium: 640,
  large: 1024,
  xlarge: 1280,
  xxlarge: 2048,
};

export const fonts: ThemeFontProps = {
  primary: fontSans,
  sans: fontSans,
  mono: fontMono,
  cond: fontCond,
};

export const brand = {
  primary: hotPink,
  primaryDark: darken(0.2, hotPink),
  secondary: limeGreen,
  secondaryDark: darken(0.2, limeGreen),
  white,
  black,
};

export const utilityColors = {
  success: '#54c326',
  danger: '#dc0b29',
  warning: '#eac71c',
  info: '#619dff',
};

export const grays = {
  s100: lighten(0.75, black),
  s200: lighten(0.7, black),
  s300: lighten(0.6, black),
  s400: lighten(0.5, black),
  s500: lighten(0.4, black),
  s600: lighten(0.3, black),
  s700: lighten(0.2, black),
  s800: lighten(0.1, black),
  s900: lighten(0.05, black),
};

export const lightTheme: ThemeModeProps = {
  background: {
    main: white,
  },
  text: {
    main: black,
  },
  button: {
    default: {
      background: grays.s100,
      backgroundHover: grays.s200,
      text: black,
    },
    primary: {
      background: brand.primary,
      backgroundHover: brand.primaryDark,
      text: white,
    },
    secondary: {
      background: brand.secondary,
      backgroundHover: brand.secondaryDark,
      text: white,
    },
  },
};

export const darkTheme: ThemeModeProps = {
  background: {
    main: grays.s900,
  },
  text: {
    main: white,
  },
  button: {
    default: {
      background: grays.s800,
      backgroundHover: grays.s700,
      text: white,
    },
    primary: {
      background: brand.primary,
      backgroundHover: lighten(0.2, brand.primary),
      text: black,
    },
    secondary: {
      background: brand.secondary,
      backgroundHover: lighten(0.2, brand.secondary),
      text: black,
    },
  },
};

export const theme: ThemeProps = {
  mode: 'light',
  brand,
  utils: utilityColors,
  grays,
  light: lightTheme,
  dark: darkTheme,
  fonts,
  breakpoints,
};

export default theme;
