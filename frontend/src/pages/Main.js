import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('logged', sessionStorage.getItem('token') !== null);
  }
  render() {
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
}

export default Main;
