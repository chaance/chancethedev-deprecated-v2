import React from 'react';

const id = 'skip-nav';

export interface SkipNavProps {
  children?: string | JSX.Element;
}

let SkipNavLink: React.FC<SkipNavProps & JSX.IntrinsicElements['a']> = ({
  children = 'Skip to main content',
  ...props
}) => (
  <a {...props} href={`#${id}`}>
    {children}
  </a>
);

let SkipNavContent: React.FC<SkipNavProps> &
  JSX.IntrinsicElements['div'] = props => <div {...props} id={id} />;

export { SkipNavLink, SkipNavContent };
