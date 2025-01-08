import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body, html, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #root {
    max-width: 600px;
    margin: 0 auto;
    border: 1px red solid;
  }
`;

export default GlobalStyles;
