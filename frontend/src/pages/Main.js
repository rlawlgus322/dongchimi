import React from 'react';
import { NavLink } from 'react-router-dom';

function Main() {
  return (
    <div>
      Main
      <ul>
        <NavLink to="/party"><li>Party</li></NavLink>
        <NavLink to="/recommend"><li>추천</li></NavLink>
        <NavLink to="/boast"><li>자랑게시판</li></NavLink>
        <NavLink to="/mypage"><li>MyPage</li></NavLink>
        <li>로그인</li>
      </ul>
    </div>
  );
}

export default Main;
