import React from 'react';

const SVG: any = ({
  children,
  viewBox = '0 0 32 32',
  className,
  ...props
}: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
};

export default SVG;
