import {
  PlayButton,
  Progress,
  Timer,
  VolumeButton,
  VolumeControl,
  VolumeRange,
} from './react-soundplayer/components';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { getButton } from '@lib/style';

export const trackStyles = (theme: any) => css`
  background: ${theme.grays.s300};
  height: 0.5em;
  border-radius: 0.25em;
`;

export const thumbStyles = (theme: any) => css`
  height: 1em;
  width: 1em;
  border: 0;
  border-radius: 0.5em;
  background: ${theme.brand.primary};
  cursor: pointer;
  appearance: none;
  margin-top: -0.25em;
`;

export const buttonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  border: 0;
  margin: 0;
  height: 2.5rem;
  width: 2.5rem;
  padding: 0.5rem;
  background: 0;
  color: inherit;
  cursor: pointer;

  & svg {
    overflow: hidden;
    position: relative;
    width: 1em;
    height: 1em;
    max-height: 100%;
    vertical-align: middle;
    color: inherit;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: ${({ theme }) => theme.grays.s100};
  color: ${({ theme }) => getButton(theme).text};
  border-radius: 3px;

  input:focus {
    outline-offset: 5px;
  }
`;

export const StyledProgress = styled(Progress)`
  width: 100%;
  height: 10px;
  margin: 0 0.5rem;
  background: ${({ theme }) => theme.grays.s300};
  cursor: pointer;

  & > * {
    height: 100%;
    background: ${({ theme }) => theme.brand.primary};
  }
`;

export const StyledVolume: any = styled(VolumeControl)`
  display: flex;
  align-items: center;
`;

export const StyledTimer: any = styled(Timer)`
  flex: ok;
  font-size: 0.75rem;
  white-space: nowrap;
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
