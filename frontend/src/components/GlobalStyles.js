import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
  ${reset};
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400|Lora');
  @import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');
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
  .page-link {
    color: #7dbb77;
  }
  .page-item.active .page-link {
    background-color: #7dbb77 !important;
    border-color: #7dbb77 !important;
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
  };
`;

export default globalStyles;