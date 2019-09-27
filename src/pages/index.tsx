import React from 'react';
import { graphql } from 'gatsby';
// import { Link } from 'gatsby';

import Layout from '$components/Layout';
import SEO from '$components/SEO';
import EpisodeList from '$components/EpisodeList';

const IndexPage: React.FC<{ data: any }> = ({
  data: {
    allBuzzsproutPodcastEpisode: { edges: episodes },
  },
}) => {
  return (
    <Layout>
      <SEO
        showSiteTitle={false}
        title="Chance the Developer 🔥 Podcast on Tech, People, and Stories"
        description="Join me as I talk with web developers and software engineers about building their careers, overcoming challenges, and succeeding in the tech industry."
      />
      <EpisodeList episodes={episodes} />
    </Layout>
  );
};

export const query = graphql`
  query HomePageQuery {
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

export default IndexPage;
