
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
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
const Recomdiv = styled.p`

`

const Recomdivin = styled.div`
  font-size : 30px;
  margin-bottom : 30px;
  margin-top : 30px;
`

function MyPage(props) {
  const [image, setImage] = useState('');
  const [userInfo, setUserInfo] = useState([]);
  const [email, setEmail] = useState('');
  const [items, setItems] = useState([]);
  const [hid, setHid] = useState('');
  const [partyImg, setPartyImg] = useState('');
  const [partyName, setPartyName] = useState('');

  useEffect(() => {
    fetchUserinfo();
  }, [])

  useEffect(() => {
    recommendChimi();
  }, [email])

  function fetchUserinfo() {
    const this_token = sessionStorage.getItem('token')
    api.get('/auth/userinfo/', {
      headers: {
        accessToken: this_token,
      }
    })
      .then(({ data }) => {
        console.log('user info', data);
        console.log('email', data.email);
        // console.log('user info', res.data);
        // this.setState({ userInfo: res.data });
        setUserInfo(data);
        const path = data.profileImage !== null ? data.profileImage : '/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'
        // this.setState({ image: 'https://k3a409.p.ssafy.io' + path });
        setImage('https://k3a409.p.ssafy.io' + path);
        // this.setState({ email: res.data.email });
        setEmail(data.email);
      })
      .catch(err => {
        console.log(err)
      })
  }

  function recommendChimi() {
    if (email === '') return;
    axios.get('https://k3a409.p.ssafy.io:8090/item', {
      params: {
        email: email
      }
    }).then(({ data }) => {
      console.log('item', data.recommendlist);
      setItems(data.recommendlist);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <Container>
      <Row>
        <Col>
          <img src={image} alt=""></img>
        </Col>
        <Col>
          <br />
          <MypageDiv>이메일: {userInfo.email}</MypageDiv>
          <MypageDiv>이름: {userInfo.username}</MypageDiv>
          <MypageDiv>성별: {userInfo.gender === 1 ? "여성" : "남성"}</MypageDiv>
          <MypageDiv>닉네임: {userInfo.nickname}</MypageDiv>
          <MypageDiv>선호 카테고리
            <MypageDiv> &nbsp;&nbsp; 1순위 - {userInfo.prefer1}</MypageDiv>
            <MypageDiv>&nbsp;&nbsp; 2순위 - {userInfo.prefer2}</MypageDiv>
            <MypageDiv>&nbsp;&nbsp; 3순위 - {userInfo.prefer3}</MypageDiv>
          </MypageDiv>
        </Col>
      </Row>
      <MypageTab></MypageTab>
      <Recomdivin>이런 취미는 어떠세요?</Recomdivin>
      <div className="row">
        {
          items.map((item, index) => (
            <div key={index} className="col-3">
              <img src={"https://k3a409.p.ssafy.io" + item[5]}
                style={{ cursor: "pointer", height: "100px" }}
                onClick={() => {
                  props.history.push(`/party/${item[0]}`)
                }}
              />
            </div>
          ))
        }
      </div>
    </Container>
  );
}

export default withRouter(MyPage);

