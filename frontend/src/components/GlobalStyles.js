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
    video {
      transform: rotateY(180deg);
      -webkit-transform:rotateY(180deg); /* Safari and Chrome */
      -moz-transform:rotateY(180deg); /* Firefox */
    }
    .active-video {
      height: 75%;
      width: 100%;
      border: solid;
    }; 
    .inactive-video {
      height: 25% !important;
      /* width: 50%; */
    };
    @font-face {
      font-family: 'Cafe24Ohsquare';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/Cafe24Ohsquare.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
`;

export default globalStyles;