import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Header from '$components/Header';
import Footer from '$components/Footer';
import { SkipNavLink, SkipNavContent } from '$components/SkipNav';
import { Container } from './Layout.styles';
import { Element } from '../../lib/types';
import ThemeProvider from '$providers/ThemeProvider';

export interface LayoutProps extends Element<'div'> {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <ThemeProvider>
      <SkipNavLink className="skipnav" />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container>
        <SkipNavContent />
        <main style={{ padding: `4rem 0` }}>{children}</main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
