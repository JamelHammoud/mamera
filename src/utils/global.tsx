import { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  body {
    background-color: black;
    color: white;
    font-size: 1rem;
    margin: 0;
    font-family: sans-serif;
    overscroll-behavior-y: none;
    overflow-x: hidden;
  }

  button {
    border: 0;
  }
`
