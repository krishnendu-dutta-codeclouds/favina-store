import { createGlobalStyle } from 'styled-components';
import { colors } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: ${colors.textLight};
    overflow-x: hidden;
  }
  img{
    width:100%;
    height: auto;
    display: block;
  }
  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }
  }

  /* Tooltip global styles */
  [data-tooltip], .global-tooltip, .custom-tooltip {
    position: relative;
  }
  [data-tooltip]:hover::after,
  [data-tooltip]:focus::after,
  .global-tooltip:hover::after,
  .global-tooltip:focus::after,
  .custom-tooltip:hover::after,
  .custom-tooltip:focus::after {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(-8px) scale(1);
  }
  [data-tooltip]:hover::before,
  [data-tooltip]:focus::before,
  .global-tooltip:hover::before,
  .global-tooltip:focus::before,
  .custom-tooltip:hover::before,
  .custom-tooltip:focus::before {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(-8px) scale(1);
  }
  [data-tooltip]::after,
  .global-tooltip::after,
  .custom-tooltip::after {
    content: attr(data-tooltip);
    opacity: 0;
    pointer-events: none;
    position: absolute;
    left:0;
    right:0;
    margin: auto;
    bottom: 120%;
    transform: translateX(-50%) scale(0.98);
    background: #222;
    color: #fff;
    padding: 7px 14px;
    border-radius: 5px;
    font-size: 13px;
    white-space: nowrap;
    z-index: 100;
    transition: opacity 0.18s, transform 0.18s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.13);
  }
  [data-tooltip]::before,
  .global-tooltip::before,
  .custom-tooltip::before {
    content: '';
    opacity: 0;
    pointer-events: none;
    position: absolute;
    left: 50%;
    bottom: 110%;
    transform: translateX(-50%) scale(0.98);
    border-width: 7px 7px 0 7px;
    border-style: solid;
    border-color: #222 transparent transparent transparent;
    z-index: 101;
    transition: opacity 0.18s, transform 0.18s;
  }
`;

export const pxToRem = (px, base = 16) => `${px / base}rem`;

const sizes = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1200px',
};

export const devices = {
  mobile: `(max-width: ${sizes.mobile})`,
  tablet: `(max-width: ${sizes.tablet})`,
  laptop: `(max-width: ${sizes.laptop})`,
  desktop: `(max-width: ${sizes.desktop})`,
};