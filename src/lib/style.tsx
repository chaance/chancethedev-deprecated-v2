import { css } from '@emotion/core';
import { ThemeProps } from '@lib/types';
import { json2mq } from '@lib/utils';
import { breakpoints as BREAKPOINTS } from '@lib/theme';

// Get the computed font size from the doc root element
// Handy for calculating ems in the browser.
export const getBaseFontSize = (fallback: number = 16): number => {
  try {
    if (typeof window === 'object' && typeof document === 'object') {
      return parseInt(
        // @ts-ignore
        window.getComputedStyle(document.body.parentElement).fontSize
      );
    }
    return fallback;
  } catch (e) {
    console.error(e);
    return fallback;
  }
};

// Get a px or em unit from a string CSS value
export const getUnit = (value: string): string | null => {
  const re = new RegExp(`(px|rem)`, 'g');
  if (!re.test(value)) {
    return '';
  }
  const sample: string[] | null = value.match(re);
  return sample ? sample[0] || null : null;
};

// Convert px to rem or rem to px
const remConvert = function(
  to: string,
  values: any[] | string | number,
  baseFontSize: number = 16
): string | number | (string | number)[] | null {
  const valArray = values instanceof Array ? values : [values];
  const result: any[] = valArray
    .map(value => {
      if (Array.isArray(value)) {
        return remConvert(to, value);
      } else {
        const intVal = parseInt(value);
        const unitless =
          typeof value === 'number'
            ? value
            : !isNaN(intVal)
            ? intVal
            : undefined;
        const unit: string | null =
          typeof value === 'string' ? getUnit(value) || null : 'px';
        if (typeof unitless === 'undefined' || !unit) return null;
        if (unitless === 0) return '0';
        if (unit === to) return `${unitless}${unit}`;
        if (unit === 'rem' && to === 'px')
          return `${unitless * baseFontSize}${to}`;
        if (unit === 'px' && to === 'rem')
          return `${unitless / baseFontSize}${to}`;
      }
      return null;
    })
    .filter(Boolean);
  return result.length ? (result.length === 1 ? result[0] : result) : null;
};

// Get a calculated REM from a pixel unit string
export const getRem = (
  values: any[] | string | number,
  baseFontSize: number = 16
) => {
  return remConvert('rem', values, baseFontSize);
};

/**
 * Generates a media query string matching the input value.
 * e.g.: ${breakpoint('medium up')} { ...styles }
 */
export const breakpoint = (
  val: string | number = 'small',
  breakpoints = BREAKPOINTS
) => {
  let bpNum: number;
  let emBp: string = '';
  let emBpMax: string = '';
  const breakpointKeys = Object.keys(breakpoints);

  if (breakpoints[breakpointKeys[0]] !== 0) {
    throw Error(
      'The first key in the breakpoints object must have a value of `0`.'
    );
  }

  const valParts = typeof val === 'string' ? val.split(' ') : [];
  let bp = breakpointKeys.includes(val as string)
    ? breakpoints[val]
    : valParts.length > 0 && breakpointKeys.includes(valParts[0])
    ? valParts[0]
    : val;
  let bpMax = 0; // Value for max-width media queries
  let dir = valParts.length > 1 ? valParts[1] : 'up'; // Direction of media query (up, down, or only)
  let str = ''; // Eventual output
  let named: boolean = false; // Is it a named media query?

  // Orientation media queries have a unique syntax
  if (bp === 'landscape' || bp === 'portrait') {
    return `(orientation: ${bp})`;
  } else if (bp === 'retina') {
    return `(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)`;
  }

  // Try to pull a named breakpoint out of the breakpoints object
  if (typeof bp === 'string') {
    if (breakpointKeys.includes(bp)) {
      if (dir === 'only' || dir === 'down') {
        const nextIndex = breakpointKeys.indexOf(bp) + 1;
        if (nextIndex) {
          bpMax = breakpoints[breakpointKeys[nextIndex]];
        }
      }
      bpNum = breakpoints[bp];
      named = true;
    } else {
      bpNum = 0;
      console.warn('`val` is not defined in the breakpoints object.');
    }
  } else {
    bpNum = bp;
  }

  emBp = (getRem(bpNum, 16) as string).replace('rem', 'em');

  // Max value is 0.2px under the next breakpoint (0.02 / 16 = 0.00125).
  if (bpMax) {
    emBpMax = `${parseInt(getRem(bpMax) as string) - 0.00125}em`;
  }

  // Conditions to skip media query creation
  // - It's a named breakpoint that resolved to "0 down" or "0 up"
  // - It's a numeric breakpoint that resolved to "0 " + anything
  if (bpNum > 0 || dir === 'only' || dir === 'down') {
    // `only` ranges use the format `(min-width: n) and (max-width: n)`
    if (dir === 'only') {
      // Only named media queries can have an "only" range
      if (named === true) {
        // Only use "min-width" if the floor is greater than 0
        if (bpNum > 0) {
          str = str + ` (min-width: ${emBp})`;
          // Only add "and" to the media query if there's a ceiling
          if (bpMax) {
            str = str + ' and ';
          }
        }
        // Only use "max-width" if there's a ceiling
        if (bpMax) {
          str = str + `(max-width: ${emBpMax})`;
        }
      } else {
        console.warn(
          'breakpoint(): Only named media queries can have an `only` range.'
        );
      }
    } else if (dir === 'down') {
      // `down` ranges use the format `(max-width: n)`
      let max = named ? bpMax : bpNum;
      // Skip media query creation if input value is exactly "0 down",
      // unless the function was called as "small down", in which case it's just "small only"
      if ((named || bpNum > 0) && !!max) {
        str = str + `(max-width: ${emBpMax})`;
      }
    } else if (bpNum > 0) {
      // `up` ranges use the format `(min-width: n)`
      str = str + `(min-width: ${emBp})`;
    }
  }
  return str ? `@media ${str}` : '&';
};

export const getMQ = (mq: any) => `@media ${json2mq(mq)}`;

export const styleVars = {
  outerMargin: `1.5rem`,
};

export const getMode = (theme: ThemeProps) => theme[theme.mode];

export const getButton = (theme: ThemeProps, key = 'default') =>
  theme[theme.mode].button[key];

export const fullWidth = () => css`
  width: calc(100vw - ${styleVars.outerMargin});
  margin-left: auto;
  margin-right: auto;

  ${breakpoint('medium')} {
    width: calc(100vw - (${styleVars.outerMargin} * 2));
  }
`;
