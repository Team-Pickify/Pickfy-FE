import { createGlobalStyle } from "styled-components";
import "../styles/fonts.css";

const GlobalStyles = createGlobalStyle`
a {
  text-decoration: none;
  color: inherit;
}
*{
  box-sizing: border-box;
}
body, html, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Pretendard";
  }
  #root {
    max-width: 600px;
    margin: 0 auto;
  }
`;
export default GlobalStyles;
