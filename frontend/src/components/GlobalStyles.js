import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html,
  body,
  ul,
  li,
  a,
  p {
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-width: 320px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    color: #b1bbc7;
    font-family: "Rubik", Arial, Helvetica, sans-serif;
    font-size: 16px;
  }
  h2 {
    color: #373352;
    font-family: "Rubik", Arial, Helvetica, sans-serif;
    font-size: 20px;
    margin: 16px 0 20px;
  }
`;
