import React from 'react';
import Episode from './Episode';
import { StyledList, StyledListItem } from './EpisodeList.styles';
import { BuzzsproutNode } from '@lib/types';

export interface EpisodeListProps {
  episodes: {
    node: BuzzsproutNode;
  }[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes = [] }) => {
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
