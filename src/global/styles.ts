import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  :root {
    --primary-color: #2AC19D;
    --secondary-color: #FFD200;

    --background-color: #FFFFFF;

    --color-white: #fff;

    --gray-01: #243939;
    --gray-02: #626060;
    --gray-03: #B9B9B9;
    --gray-04: #D2D1D1;
  }

  body {
    -webkit-font-smoothing: antialised;
    background: var(--background-color);
  }

  body, input, button {
    font-family: 'Poppins', sans-serif;
  }

  button {
    cursor: pointer;
  }

  p, a, span, label {
    font-weight: 500;
    color: "#6D6D6D";
  }

  p {
    margin-bottom: 0px;
  }

  h1, h2, h3, h4, h5 {
    margin-bottom: 0px;
  }

  ::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }
  ::-webkit-scrollbar-thumb {
    background: #C7C7C7;
    border-radius: 6px;
  }
    ::-webkit-scrollbar-thumb:hover{
    background: #afe084;
  }
  ::-webkit-scrollbar-track{
    background: #fafafa;
    border-radius: 7px;
    box-shadow: inset 7px 10px 12px #f0f0f0;
  }
`;
