import React, { Component } from 'react';
import MypageTab from '../../components/mypage/MypageTab';
import { Container, Row, Col } from 'react-bootstrap';
import api from '../../utils/api';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
    }
  }
  componentDidMount() {
    const fetchUserinfo = () => {
      const this_token = sessionStorage.getItem('token')
      api.get('auth/userinfo/', {
        headers: {
          accessToken: this_token,
        }
      })
      .then(res => {
        this.setState({ userInfo: res.data });
        this.setState({ image: 'https://k3a409.p.ssafy.io' + res.data.profileImage });
      })
      .catch(err => {
        console.log(err)
      })
    }
    fetchUserinfo()
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div>프로필 사진</div>
            <img src={this.state.userInfo.profileImage} alt=""></img>
          </Col>
          <Col>
            <div>사용자 정보</div>
            <div>{this.state.userInfo.email}</div>
            <div>{this.state.userInfo.nickname}</div>
          </Col>
        </Row>
        <Row>
          <MypageTab></MypageTab>
        </Row>
      </Container>
    );
  }
}

export default MyPage;

