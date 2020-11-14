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
`;

export default globalStyles;