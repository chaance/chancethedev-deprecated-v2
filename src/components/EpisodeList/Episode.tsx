import React from 'react';
import {
  StyledEpisode,
  StyledTitle,
  StyledSubtitle,
  StyledAudio,
  StyledContentWrapper,
  CoverImg,
  CoverImgContainer,
} from './EpisodeList.styles';
import { BuzzsproutNode } from '$lib/types';

export interface EpisodeProps {
  node: BuzzsproutNode;
}

const Episode: React.FC<EpisodeProps> = ({
  node: {
    id,
    artwork_url,
    audio_url,
    description = '',
    episode_number,
    summary,
    title,
  },
}) => {
  const modTitle = (title as string).replace(/^(E|e)[0-9]+:\s+/, '');
  return (
    <StyledEpisode>
      {artwork_url ? (
        <CoverImgContainer>
          <CoverImg
            src={artwork_url}
            alt={`Cover for podcast episode ${episode_number}`}
          />
        </CoverImgContainer>
      ) : null}

      <StyledContentWrapper>
        <header>
          <StyledTitle>{modTitle}</StyledTitle>
          <StyledSubtitle>Episode {episode_number}</StyledSubtitle>
        </header>
        {summary ? <p>{summary}</p> : null}
        <StyledAudio src={audio_url} />
      </StyledContentWrapper>
    </StyledEpisode>
  );
};

export default Episode;
