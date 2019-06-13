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
import SRT from '../SRT';

// TODO: Lots of bugs in this component; refactoring as we go.

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
