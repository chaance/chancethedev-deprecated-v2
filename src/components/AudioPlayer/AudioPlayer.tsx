import React from 'react';
import {
  StyledPlayButton,
  StyledProgress,
  StyledTimer,
  StyledVolume,
  StyledVolumeButton,
  StyledDownloadLink,
  StyledRange,
  StyledRangeContainer,
  Container,
} from './AudioPlayer.styles';
import { DownloadIconSVG } from './react-soundplayer/components/Icons';
import { withCustomAudio } from './react-soundplayer/addons';
import SRT from '@components/SRT';

// TODO: Lots of bugs in this component; refactoring as we go.

interface AudioPlayerState {
  duration: number;
  currentTime: number;
  isSeeking: boolean;
  isPlaying: boolean;
  playReady: boolean;
  volume: number;
  isMuted: boolean;
}

export type AudioPlayerAction =
  | { type: 'SET_PLAYING' }
  | { type: 'SET_PAUSE' }
  | { type: 'START_SEEKING' }
  | { type: 'SEEK'; time: number }
  | { type: 'STOP_SEEKING'; time: number }
  | { type: 'SET_ELAPSED_TIME' }
  | { type: 'SET_TO_BEGINNING' }
  | { type: 'PLAY_FROM_BEGINNING' }
  | { type: 'TOGGLE_LOOP' }
  | { type: 'TOGGLE_PLAYING' }
  | { type: 'MUTE' }
  | { type: 'SET_VOLUME' };

const initialState: AudioPlayerState = {
  duration: 0,
  currentTime: 0,
  isSeeking: false,
  isPlaying: false,
  playReady: true,
  volume: 1,
  isMuted: false,
};

const reducer = (
  state: AudioPlayerState,
  action: AudioPlayerAction
): AudioPlayerState => {
  switch (action.type) {
    case 'SET_PLAYING':
      return { ...state, isPlaying: true };
    case 'SET_PAUSE':
      return { ...state, isPlaying: false };
    case 'TOGGLE_PLAYING':
      return { ...state, isPlaying: !state.isPlaying };
    case 'START_SEEKING':
      return {
        ...state,
        isSeeking: true,
      };
    case 'SEEK':
      return {
        ...state,
        isSeeking: true,
        currentTime: action.time,
      };
    case 'STOP_SEEKING':
      return {
        ...state,
        isSeeking: false,
        currentTime: action.time,
      };
    default:
      return state;
  }
};

const AudioPlayer = withCustomAudio(({ className, ...props }: any) => {
  const { streamUrl } = props;
  return (
    <Container className={className}>
      <StyledPlayButton {...props} />
      <StyledVolume {...props}>
        {({ handleMute, isMuted, volume, value, handleVolumeChange }: any) => (
          <React.Fragment>
            <StyledVolumeButton
              onClick={handleMute}
              isMuted={isMuted}
              volume={volume}
            />
            <StyledRangeContainer>
              <StyledRange
                className=""
                onChange={handleVolumeChange}
                value={value}
              />
            </StyledRangeContainer>
          </React.Fragment>
        )}
      </StyledVolume>
      <StyledProgress {...props} />
      <StyledTimer {...props} />
      <StyledDownloadLink
        href={streamUrl}
        target="_blank"
        rel="noreferrer noopener"
        tabIndex={0}
        role="button"
      >
        <DownloadIconSVG aria-hidden />
        <SRT>Download the episode</SRT>
      </StyledDownloadLink>
    </Container>
  );
});

export default AudioPlayer;
