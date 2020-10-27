import React from 'react';
import { NavLink } from 'react-router-dom';

function NavHeader() {
  return (
    <div className="App">
      <li>
        <NavLink to="/"><ul>Home</ul></NavLink>
        <NavLink to="/party"><ul>Party</ul></NavLink>
        <NavLink to="/recommend"><ul>추천</ul></NavLink>
        <NavLink to="/boast"><ul>자랑게시판</ul></NavLink>
        <NavLink to="/mypage"><ul>MyPage</ul></NavLink>
        <ul>로그인</ul>
      </li>
    </div>
  );
}

export default NavHeader;
