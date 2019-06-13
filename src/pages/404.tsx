import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import Layout from '@components/Layout';
import SEO from '@components/SEO';
import EpisodeList from '@components/EpisodeList';

function getRadomInt(min: number = 0, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const NotFoundPage: React.FC<{ data: any }> = ({
  data: {
    allBuzzsproutPodcastEpisode: { edges: episodes },
  },
}) => {
  const [randEpisode, setRandomEpisode] = useState(null);
  useEffect(() => {
    const randIndex = getRadomInt(0, episodes.length - 1);
    const randomEpisode = (episodes as any[]).find((x, index, arr) => {
      return index === randIndex;
    });
    setRandomEpisode(randomEpisode);
  }, []);
  return (
    <Layout>
      <SEO title="404: Danger!" />
      <h1>404: Danger!</h1>
      <p>
        You can clearly predict the future, as you've landed on a page that
        hasn't yet been created. Well done.
      </p>
      <p>
        Until I get around to whipping up the content you're looking for, maybe
        check out this random episode of the show!
      </p>
      <hr
        style={{
          margin: `4rem 0`,
          border: 0,
          height: 1,
          background: '#f64861',
        }}
      />
      <EpisodeList episodes={randEpisode ? [randEpisode] : []} />
    </Layout>
  );
};

export const query = graphql`
  query ErrorPageQuery {
    allBuzzsproutPodcastEpisode {
      edges {
        node {
          id
          title
          description
          summary
          audio_url
          episode_number
          artwork_url
        }
      }
    }
  }
`;

export default NotFoundPage;
