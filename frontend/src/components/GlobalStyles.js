import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
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
        font-family: 'Noto Sans KR', sans-serif;
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
`;

export default globalStyles;