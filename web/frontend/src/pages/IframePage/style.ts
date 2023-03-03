import { css } from 'wiloke-react-core';

export const container = css`
  debug: IframePage-container;
  padding: 0px;
  display: block;
  z-index: 100;
  position: relative;
  width: 100%;
  min-height: 800px;
  max-height: 800px;
  height: 800px;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;
