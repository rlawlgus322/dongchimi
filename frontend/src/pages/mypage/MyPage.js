import React, { Component } from 'react';
import MypageTab from '../../components/mypage/MypageTab';
import { Container, Row, Col } from 'react-bootstrap';
import api from '../../utils/api';
import axios from 'axios';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const MypageDiv = styled.div`
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  margin-top : 30px;
  border-bottom:2px solid #d0e7ce
`
const MypageBack = styled.span`
  background-color: #d0e7ce;
`

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      email: '',
    }
  }
  componentDidMount() {
    const fetchUserinfo = () => {
      const this_token = sessionStorage.getItem('token')
      api.get('/auth/userinfo/', {
        headers: {
          accessToken: this_token,
        }
      })
        .then(res => {
          // console.log('user info', res.data);
          this.setState({ userInfo: res.data });
          const path = res.data.profileImage !== null ? res.data.profileImage : '/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'
          this.setState({ image: 'https://k3a409.p.ssafy.io' + path });
          this.setState({ email: res.data.email });
        })
        .catch(err => {
          console.log(err)
        })
    }
    fetchUserinfo()
  }

  componentDidUpdate() {
    if (this.state.email !== '')
      this.recommendChimi();
  }

  recommendChimi() {
    axios.get('https://k3a409.p.ssafy.io:8090/item', {
      params: {
        email: this.state.email
      }
    }).then(({ data }) => {
      console.log('item', data);
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div>프로필 사진</div>
            <img src={this.state.image} alt=""></img>
          </Col>

          <Col>
            <br />
            <MypageDiv>이메일: {this.state.userInfo.email}</MypageDiv>
            <MypageDiv>이름: {this.state.userInfo.username}</MypageDiv>
            <MypageDiv>성별: {this.state.userInfo.gender === 1 ? "여성" : "남성"}</MypageDiv>
            <MypageDiv>닉네임: {this.state.userInfo.nickname}</MypageDiv>
            <MypageDiv>선호 카테고리<MypageDiv> &nbsp;&nbsp; 1순위 - {this.state.userInfo.prefer1}</MypageDiv><MypageDiv>&nbsp;&nbsp; 2순위 - {this.state.userInfo.prefer2}</MypageDiv><MypageDiv>&nbsp;&nbsp; 3순위 - {this.state.userInfo.prefer3}</MypageDiv></MypageDiv>
          </Col>

        </Row>
        <MypageTab></MypageTab>
      </Container>
    );
  }
}

export default MyPage;

