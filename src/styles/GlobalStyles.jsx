import { createGlobalStyle } from "styled-components";
import "../styles/fonts.css";

const GlobalStyles = createGlobalStyle`
body, html, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Pretendard-Regular";
  }
  #root {
    max-width: 600px;
    margin: 0 auto;
    border: 1px red solid;
  }
`;
export default GlobalStyles;
