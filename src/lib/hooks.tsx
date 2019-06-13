import {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  DependencyList,
  EffectCallback,
} from 'react';
import { json2mq } from '@lib/utils';

export { useTheme } from '@providers/ThemeProvider';

type Effect = (effect: EffectCallback, deps?: DependencyList) => void;

/**
 * Creates a hook for either `useEffect` or `useLayoutEffect`
 * const isDesktop = useMediaLayout({ minWidth: 500 }, true);
 */
const createUseMedia = (effect: Effect) => (
  rawQuery: any,
  defaultState: boolean = false
) => {
  const [state, setState] = useState(defaultState);
  const query = json2mq(rawQuery);
  effect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) return;
      setState(!!mql.matches);
    };

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
};

/**
 * Store a component's previous value in a ref for use after the value changes.
 */
export function usePrevious(value: any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const useMedia = createUseMedia(useEffect);

export const useMediaLayout = createUseMedia(useLayoutEffect);
