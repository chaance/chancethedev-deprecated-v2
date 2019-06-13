import React from 'react';
import Episode from './Episode';
import { StyledList, StyledListItem } from './EpisodeList.styles';

const EpisodeList = ({ episodes = [] }: any) => {
  return (
    <StyledList>
      {Array.isArray(episodes)
        ? episodes.map(({ node }: any) => {
            return (
              <StyledListItem key={node.id}>
                <Episode node={node} />
              </StyledListItem>
            );
          })
        : null}
    </StyledList>
  );
};

export default EpisodeList;
