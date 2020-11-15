import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        font-family:Cafe24Ohsquare;
        color:inherit;
        &:hover{
          color: inherit;
          text-decoration: none;
        }
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:Cafe24Ohsquare;
        font-size:16px;
        padding-top: 50px;
    }
    button{
      border: none;
      background-color: rgba(0, 0, 0, 0);
      &:focus{
        outline: none;
      }
    }
    .pagination {
      display: inline-block !important;
    }
    .pagination > li {
      display: inline-block;
    }
    @font-face {
      font-family: 'Cafe24Ohsquare';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/Cafe24Ohsquare.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
`;

export default globalStyles;