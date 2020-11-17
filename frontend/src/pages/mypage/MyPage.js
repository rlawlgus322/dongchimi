
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import MypageTab from '../../components/mypage/MypageTab';
import { Container, Row, Col } from 'react-bootstrap';
import api from '../../utils/api';
import axios from 'axios';
import styled from 'styled-components';
import './Register.css'

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

  useEffect(() => {
    fetchUserinfo();
  }, [])

  useEffect(() => {
    function recommendChimi() {
      if (email === '') return;
      axios.get('https://k3a409.p.ssafy.io:8090/item', {
        params: {
          email: email
        }
      }).then(({ data }) => {
        // console.log('item', data.recommendlist);
        setItems(data.recommendlist);
      }).catch((err) => {
        console.log(err);
      })
    }

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
        // console.log('user info', data);
        setUserInfo(data);
        const path = data.profileImage !== null ? data.profileImage : '/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'
        setImage('https://k3a409.p.ssafy.io' + path);
        setEmail(data.email);
      })
      .catch(err => {
        console.log(err)
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
          <div className="myInfo">이메일: {userInfo.email}</div>
          <div className="myInfo">이름: {userInfo.username}</div>
          <div className="myInfo">성별: {userInfo.gender === 1 ? "여성" : "남성"}</div>
          <div className="myInfo">닉네임: {userInfo.nickname}</div>
          <div className="myInfo">선호 카테고리</div>
          <div className="myInfo"> &nbsp;&nbsp; 1순위 - {userInfo.prefer1}</div>
          <div className="myInfo">&nbsp;&nbsp; 2순위 - {userInfo.prefer2}</div>
          <div className="myInfo">&nbsp;&nbsp; 3순위 - {userInfo.prefer3}</div>
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
                alt="thumbnail"
              />
            </div>
          ))
        }
      </div>
    </Container>
  );
}

export default withRouter(MyPage);

