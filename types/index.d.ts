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
