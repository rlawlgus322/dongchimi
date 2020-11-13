import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
        &:hover{
          text-decoration: none;
        }
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:--apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:16px;
        color: white;
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