import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/party">Party</NavLink></li>
      <li><NavLink to="/recommend">추천</NavLink></li>
      <li><NavLink to="/boast">자랑게시판</NavLink></li>
      <li><NavLink to="/mypage">MyPage</NavLink></li>
    </Ul>
  )
}

export default RightNav