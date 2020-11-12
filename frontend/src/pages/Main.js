import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginModal from '../components/mypage/LoginModal';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const logged = sessionStorage.getItem('token') === null ? false : true;

    return (

      <div>
        Main
        <ul>
          <NavLink to="/party"><li>Party</li></NavLink>
          <NavLink to="/recommend"><li>추천</li></NavLink>
          <NavLink to="/boast"><li>자랑게시판</li></NavLink>
          {logged &&
            <NavLink to="/mypage"><li>마이페이지</li></NavLink>
          }
          {!logged &&
            <LoginModal></LoginModal>
          }
        </ul>
      </div>
    );
  }
}

export default Main;

