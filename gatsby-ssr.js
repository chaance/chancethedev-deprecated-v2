import React from 'react';
import Helmet from 'react-helmet';

export const onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
  setBodyAttributes,
}) => {
  // https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-react-helmet/src/gatsby-ssr.js
  const helmet = Helmet.renderStatic();
  setHtmlAttributes(helmet.htmlAttributes.toComponent());
  setBodyAttributes(helmet.bodyAttributes.toComponent());
  setHeadComponents([
    helmet.title.toComponent(),
    helmet.link.toComponent(),
    helmet.meta.toComponent(),
    helmet.noscript.toComponent(),
    helmet.script.toComponent(),
    helmet.style.toComponent(),
    helmet.base.toComponent(),
  ]);
};
