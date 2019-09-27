/* eslint-disable no-duplicate-imports */
/* eslint-disable no-undef */
declare module 'soundcloud-audio' {
  import SoundCloudAudio from 'soundcloud-audio';
  type RCallback = (data: {}) => any;
  export interface SoundCloudAudioProps {}
}

declare module 'react-soundplayer/components' {
  export const PlayButton: React.ComponentType<{}>;
  export const Progress: React.ComponentType<{}>;
  export const Timer: React.ComponentType<{}>;
  export const VolumeControl: React.ComponentType<{}>;
}

declare module 'react-soundplayer/addons' {
  import SoundCloudAudio from 'soundcloud-audio';
  export interface WithCustomAudioProps {
    trackTitle: string;
    streamUrl: string;
    preloadType?: string;
  }
  export interface WithSoundCloudAudioProps extends WithCustomAudioProps {
    clientId: string;
  }
  export function withCustomAudio<P extends WithCustomAudioProps>(
    Component: React.ComponentType<P>
  ): React.FC<P & WithCustomAudioProps>;
}

declare module '@emotion/styled' {
  import { CreateStyled } from '@emotion/styled/types/index';
  import { EmotionTheme } from '$providers/ThemeProvider';
  export * from '@emotion/styled/types/index';
  const customStyled: CreateStyled<EmotionTheme>;
  export default customStyled;
}

declare module 'react-helmet' {
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

  export class Helmet extends React.Component<HelmetProps> {
    static peek(): HelmetData;
    static rewind(): HelmetData;
    static renderStatic(): HelmetData;
    static canUseDOM: boolean;
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

  export const peek: () => HelmetData;
  export const rewind: () => HelmetData;
  export const renderStatic: () => HelmetData;
  export const canUseDOM: boolean;
  export default Helmet;
}
