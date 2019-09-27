/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { rgba, rem } from 'polished';
// import { DownloadIcon } from '$components/Icons';
import { EmotionTheme } from '$providers/ThemeProvider';
import {
  PlayButton,
  Progress,
  Timer,
  VolumeButton,
  VolumeRange,
} from './components';
import { breakpoint, getButton } from '$lib/style';
import { Element } from '$lib/types';

// TODO: Still working out some bugs in this component; refactoring as we go.

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

interface AudioPlayerProps extends Element<'div'> {
  src: string;
  preload?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  preload,
  ...props
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  // TODO: Replace with useReducer
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playReady, setPlayReady] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setMuted] = useState(false);

  function togglePlay(event: any) {
    const { current: audioElement } = audioRef;
    if (!playReady) return;
    if (audioElement) {
      !playing ? audioElement.play() : audioElement.pause();
    }
  }

  function handleSeekTrack(newTime: number, event?: any) {
    const { current: audioElement } = audioRef;
    if (audioElement != null) {
      audioElement.currentTime = newTime;
    }
  }

  function onSeekingTrack() {
    const { current: audioElement } = audioRef;
    if (audioElement != null) {
      setSeeking(true);
    }
  }

  function onSeekedTrack() {
    const { current: audioElement } = audioRef;
    if (audioElement != null) {
      setSeeking(false);
    }
  }

  function onAudioStarted() {
    const { current: audioElement } = audioRef;
    if (audioElement != null) {
      setPlaying(true);
    }
  }

  function onAudioPaused() {
    const { current: audioElement } = audioRef;
    if (audioElement != null) {
      setPlaying(false);
    }
  }

  function onAudioEnded() {
    const { current: audioElement } = audioRef;
    if (audioElement != null) {
      setPlaying(false);
    }
  }

  function onVolumeChange() {
    const { current: audioElement } = audioRef;
    if (audioElement != null) {
      setVolume(audioElement.volume);
      setMuted(audioElement.muted);
    }
  }

  function getCurrentTime() {
    const { current: audioElement } = audioRef;
    if (audioElement != null) {
      setCurrentTime(audioElement.currentTime);
    }
  }

  function getDuration() {
    const { current: audioElement } = audioRef;
    if (audioElement != null) {
      setPlayReady(true);
      setDuration(audioElement.duration);
    }
  }

  function handleVolumeChange(event: React.SyntheticEvent<any, Event>) {
    const { current: audioElement } = audioRef;
    if (audioElement != null) {
      try {
        const xPos = parseFloat((event.target as HTMLInputElement).value) / 100;
        const mute = xPos <= 0 && !isMuted;

        audioElement.volume = xPos;
        audioElement.muted = mute;
      } catch (e) {
        console.error(e);
      }
    }
  }

  function handleMute(event: React.MouseEvent) {
    const { current: audioElement } = audioRef;
    if (audioElement != null) {
      audioElement.muted = !audioElement.muted;
    }
  }

  const volumeValue = useMemo(
    () => (isMuted ? 0 : Math.max(Math.min(volume * 100, 100), 0)),
    [volume, isMuted]
  );

  return (
    <Container {...props}>
      <StyledPlayButton
        playing={playing}
        seeking={false}
        playReady={playReady}
        onClick={togglePlay}
      />
      <StyledVolume>
        <StyledVolumeButton
          onClick={handleMute}
          isMuted={isMuted}
          volume={volume}
        />
        <StyledRangeContainer>
          <StyledRange onChange={handleVolumeChange} value={volumeValue} />
        </StyledRangeContainer>
      </StyledVolume>
      <StyledProgress
        togglePlay={togglePlay}
        handleSeekTrack={handleSeekTrack}
        duration={duration}
        currentTime={currentTime}
      />
      <StyledTimer currentTime={currentTime} duration={duration} />
      {/* <StyledDownloadLink
        href={src}
        target="_blank"
        rel="noreferrer noopener"
        tabIndex={0}
        role="button"
      >
        <DownloadIcon fill="currentColor" aria-hidden />
        <SRT>Download the episode</SRT>
      </StyledDownloadLink> */}
      <audio
        ref={audioRef}
        hidden
        controls={false}
        preload={preload}
        src={src}
        onPlaying={onAudioStarted}
        onTimeUpdate={getCurrentTime}
        onLoadedMetadata={getDuration}
        onSeeking={onSeekingTrack}
        onSeeked={onSeekedTrack}
        onPause={onAudioPaused}
        onEnded={onAudioEnded}
        onVolumeChange={onVolumeChange}
      />
    </Container>
  );
};

export default AudioPlayer;

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////
export const trackStyles = (theme: any) =>
  css({
    background: theme.grays.s300,
    height: `0.5em`,
    borderRadius: '0.25em',
  });

export const thumbStyles = (theme: any) =>
  css({
    height: '1em',
    width: '1em',
    border: 0,
    borderRadius: '0.5em',
    background: theme.brand.primary,
    cursor: 'pointer',
    appearance: 'none',
    marginTop: '-0.25em',
  });

export const buttonStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  appearance: 'none',
  border: 0,
  margin: 0,
  height: '2.5rem',
  width: '2.5rem',
  padding: '0.5rem',
  background: 0,
  color: 'inherit',
  cursor: 'pointer',
  '& svg': {
    overflow: 'hidden',
    position: 'relative',
    width: '1em',
    height: '1em',
    maxHeight: '100%',
    verticalAlign: 'middle',
    color: 'inherit',
  },
});

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: ${({ theme }: any) => theme.grays.s100};
  color: ${({ theme }: any) => getButton(theme).text};
  border-radius: 3px;
  input:focus {
    outline-offset: 5px;
  }
`;

export const StyledProgress = styled(Progress)`
  width: 100%;
  height: 10px;
  margin: 0 0.5rem;
  background: ${({ theme }: any) => theme.grays.s300};
  cursor: pointer;

  & > * {
    height: 100%;
    background: ${({ theme }: any) => theme.brand.primary};
  }
`;

export const StyledVolume: any = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTimer: any = styled(Timer)`
  padding: 0.5rem;
  font-size: 0.75rem;
  white-space: nowrap;

  ${breakpoint('small down')} {
    display: none;
  }
`;

export const StyledPlayButton = styled(PlayButton)`
  flex: none;
  ${buttonStyles};
`;

export const StyledDownloadLink = styled.a`
  flex: none;
  ${buttonStyles};

  @media (max-width: 400px) {
    display: none;
  }
`;

export const StyledVolumeButton = styled(VolumeButton)`
  ${buttonStyles};
`;

export const StyledRange = styled(VolumeRange)`
  border: 0;
  background: 0;
  user-select: none !important;
  cursor: default;
  appearance: none;
  width: 98%;

  &::-ms-track {
    ${({ theme }) => trackStyles(theme)};
  }

  &::-webkit-slider-runnable-track {
    ${({ theme }) => trackStyles(theme)};
  }

  &::-moz-range-track {
    ${({ theme }) => trackStyles(theme)};
  }

  &::-webkit-slider-thumb {
    ${({ theme }) => thumbStyles(theme)};
  }

  &::-moz-range-thumb {
    ${({ theme }) => thumbStyles(theme)};
  }

  &::-ms-thumb {
    ${({ theme }) => thumbStyles(theme)};
  }
`;

export const StyledRangeContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 0;
  height: 2.25em;
  transition: width 0.2s ease-out;
  position: relative;
  background: 0;

  ${StyledVolume}:hover &,
  ${StyledVolume}:focus-within & {
    width: 80px;
    overflow: visible;
  }
`;
