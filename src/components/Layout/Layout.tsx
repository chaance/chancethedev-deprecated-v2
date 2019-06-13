import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ThemeProvider from '@src/providers/ThemeProvider';
import { Container } from './Layout.styles';

const Layout: React.FC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Container>
          <main style={{ padding: `4rem 0` }}>{children}</main>
        </Container>
        <Footer />
      </ThemeProvider>
    )}
  />
);

export default Layout;
