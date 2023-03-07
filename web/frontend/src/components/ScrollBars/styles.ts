import { css } from 'wiloke-react-core';

export const scrollbar = css`
  debug: ScrollBars;
  --width: 10px;
  --scrollbar-track-color: transparent;
  --scrollbar-thumb-color: transparent;
  --scrollbar-thumb-color-hover: #999;
  --scrollbar-thumb-padding: 2px;
  --scrollbar-radius: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  width: 100%;

  &::-webkit-scrollbar {
    width: var(--width);
  }
  &::-webkit-scrollbar-track {
    background-color: var(--scrollbar-track-color);
    border-radius: var(--scrollbar-radius);
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border: var(--scrollbar-thumb-padding) solid transparent;
    border-radius: var(--scrollbar-radius);
    background-clip: padding-box;
    background-color: var(--scrollbar-thumb-color);
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: var(--scrollbar-thumb-color-hover);
    }
  }
`;
