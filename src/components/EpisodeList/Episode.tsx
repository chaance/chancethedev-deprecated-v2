import React from 'react';
import {
  StyledEpisode,
  StyledTitle,
  StyledSubtitle,
  StyledAudio,
  StyledContentWrapper,
  CoverImg,
} from './EpisodeList.styles';

const Episode = ({
  node: {
    id,
    artwork_url,
    audio_url,
    description = '',
    episode_number,
    summary,
    title,
  },
}: any) => {
  const modTitle = (title as string).replace(/^(E|e)[0-9]+:\s+/, '');
  return (
    <StyledEpisode>
      {artwork_url ? (
        <CoverImg
          src={artwork_url}
          alt={`Cover for podcast episode ${episode_number}`}
        />
      ) : null}

      <StyledContentWrapper>
        <header>
          <StyledTitle>{modTitle}</StyledTitle>
          <StyledSubtitle>Episode {episode_number}</StyledSubtitle>
        </header>
        {summary ? <p>{summary}</p> : null}
        <StyledAudio
          trackTitle={title}
          streamUrl={audio_url}
          preloadType="auto"
        />
      </StyledContentWrapper>
    </StyledEpisode>
  );
};

export default Episode;
