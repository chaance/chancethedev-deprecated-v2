import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { SkipNavLink, SkipNavContent } from '@components/SkipNav';
import ThemeProvider from '@providers/ThemeProvider';
import { Container } from './Layout.styles';

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => (
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
        <SkipNavLink className="skipnav" />
        <Header siteTitle={data.site.siteMetadata.title} />
        <Container>
          <SkipNavContent />
          <main style={{ padding: `4rem 0` }}>{children}</main>
        </Container>
        <Footer />
      </ThemeProvider>
    )}
  />
);

export default Layout;
