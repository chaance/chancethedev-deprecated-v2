const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');

exports.onCreateWebpackConfig = ({ config, actions }) => {
  actions.setWebpackConfig({
    plugins: [new LoadablePlugin()],
    resolve: {
      alias: {
        '@src': path.join(__dirname, './src'),
        '@components': path.join(__dirname, './src/components'),
        '@lib': path.join(__dirname, './src/lib'),
        '@images': path.join(__dirname, './src/images'),
      },
    },
  });
};

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === `Show`) {
    actions.createNodeField({
      node,
      name: 'slug',
      value: `/show/${node.id}`,
    });
  }
};

/* exports.createPages = ({ graphql, actions }) => {
  return new Promise((resolve, reject) => {
    const episodeTemplate = path.resolve('./src/templates/episode.tsx');
    const episodeQuery = `
      {
        allBuzzsproutPodcastEpisode {
          edges {
            node {
              id
              title
              audio_url
              episode_number
            }
          }
        }
      }
    `;

    resolve(
      graphql(episodeQuery).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        result.data.allBuzzsproutPodcastEpisode.edges.forEach(edge => {
          const slug = toSlug(edge.node.title);
          actions.createPage({
            path: slug,
            component: episodeTemplate,
            context: {
              slug,
            },
          });
        });
      })
    );
  });
}; */

function toSlug(s) {
  if (!s) {
    return '';
  }
  s = s.toLowerCase().trim();
  s = s.replace(/ & /g, ' and ');
  s = s.replace(/[ ]+/g, '-');
  s = s.replace(/[-]+/g, '-');
  s = s.replace(/[^a-z0-9-]+/g, '');
  return s;
}
