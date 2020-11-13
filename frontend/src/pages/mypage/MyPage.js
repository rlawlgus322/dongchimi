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
          const path = res.data.profileImage !== null ? res.data.profileImage : '/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'
          this.setState({ image: 'https://k3a409.p.ssafy.io' + path });
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
            <br />
            <h4>이메일: {this.state.userInfo.email}</h4>
            <h4>이름: {this.state.userInfo.username}</h4>
            <h4>성별: {this.state.userInfo.gender === 1 ? "여성" : "남성"}</h4>
            <h4>닉네임: {this.state.userInfo.email}</h4>
            <h4>선호 카테고리: 1순위-{this.state.userInfo.prefer1}/<br />2순위-{this.state.userInfo.prefer2}/3순위-{this.state.userInfo.prefer3}</h4>
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

