import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import LoginModal from '../LoginModal';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 10px;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #fff;
    }
  }

  .drop-down ul {
    display: block;
    position: absolute;
    right: 0;
    top: 3.4rem;
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    padding: 10px 0;
    background: #fff;
    box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
    transition: ease all 0.3s;
    list-style: none;
  }

  .drop-down:hover > ul {
    opacity: 1;
    visibility: visible;
  }

  .drop-down li {
    min-width: 180px;
    position: relative;
  }

  .drop-down ul a {
    padding: 10px 20px;
    font-size: 13px;
    color: #004289;
  }

  .drop-down ul a:hover,
  .drop-down ul .active > a,
  .drop-down ul li:hover > a {
    color: #007bff;
  }

  .drop-down > a:after {
    content: "\f107";
    font-family: FontAwesome;
    padding-left: 10px;
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/party">Party</NavLink></li>
      <li><NavLink to="/recommend">추천</NavLink></li>
      <li><NavLink to="/boast">자랑게시판</NavLink></li>
      <li><LoginModal></LoginModal></li>
      <li className="drop-down">
        <NavLink to="/mypage">MyPage</NavLink>
        <ul>
          <li><NavLink to="/update">프로필 설정</NavLink></li>
          <li>로그아웃</li>
        </ul>
      </li>

    </Ul>
  )
}

export default RightNav