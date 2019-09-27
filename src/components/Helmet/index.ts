import { Helmet } from './Helmet';
export { Helmet };
export default Helmet;

type LinkProps = JSX.IntrinsicElements['link'];

type MetaProps = JSX.IntrinsicElements['meta'];

interface TagUpdates {
  baseTag: Array<any>;
  linkTags: Array<HTMLLinkElement>;
  metaTags: Array<HTMLMetaElement>;
  noscriptTags: Array<any>;
  scriptTags: Array<HTMLScriptElement>;
  styleTags: Array<HTMLStyleElement>;
}

export interface HelmetProps {
  async?: boolean;
  base?: any;
  bodyAttributes?: Object;
  defaultTitle?: string;
  defer?: boolean;
  encodeSpecialCharacters?: boolean;
  htmlAttributes?: any;
  onChangeClientState?: (
    newState: any,
    addedTags: TagUpdates,
    removedTags: TagUpdates
  ) => void;
  link?: LinkProps[];
  meta?: MetaProps[];
  noscript?: Array<any>;
  script?: Array<any>;
  style?: Array<any>;
  title?: string;
  titleAttributes?: Object;
  titleTemplate?: string;
}

export interface HelmetData {
  base: HelmetDatum;
  bodyAttributes: HelmetHTMLBodyDatum;
  htmlAttributes: HelmetHTMLElementDatum;
  link: HelmetDatum;
  meta: HelmetDatum;
  noscript: HelmetDatum;
  script: HelmetDatum;
  style: HelmetDatum;
  title: HelmetDatum;
  titleAttributes: HelmetDatum;
}

export interface HelmetDatum {
  toString(): string;
  toComponent(): React.Component<any>;
}

export interface HelmetHTMLBodyDatum {
  toString(): string;
  toComponent(): React.HTMLAttributes<HTMLBodyElement>;
}

export interface HelmetHTMLElementDatum {
  toString(): string;
  toComponent(): React.HTMLAttributes<HTMLElement>;
}
