const path = require('path');

exports.onCreateWebpackConfig = ({ config, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
        'react-helmet': path.join(__dirname, './src/components/react-helmet'),
        $src: path.join(__dirname, './src'),
        $components: path.join(__dirname, './src/components'),
        $images: path.join(__dirname, './src/images'),
        $lib: path.join(__dirname, './src/lib'),
        $pages: path.join(__dirname, './src/pages'),
        $providers: path.join(__dirname, './src/providers'),
        $templates: path.join(__dirname, './src/templates'),
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

// eslint-disable-next-line no-unused-vars
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
