import React from 'react';
import { ThemeProvider } from './src/providers';
import 'unfetch';
import './src/lib/style.css';

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};
