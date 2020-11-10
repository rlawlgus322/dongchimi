import React, { Component } from 'react';
import MypageTab from '../../components/mypage/MypageTab';
import { Container, Row, Col } from 'react-bootstrap';
import api from '../../utils/api';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      image: '',
    }
  }
  componentDidMount() {
    // const  [img, setImage] = useState(null);
    // const onChange = (e) => { }
    const fetchUserinfo = () => {
      const this_token = sessionStorage.getItem('token')
      console.log(this_token)
      api.get('auth/userinfo/', {
        headers: {
          accessToken: this_token,
        }
      })
        .then(res => {
          // console.log("res " + JSON.stringify(res))
          // const userinfo = res.data
          this.setState({ userInfo: res.data });
          console.log("이미지 주소 " + res.data.progileImage)
          const path = 'https://k3a409.p.ssafy.io' + res.data.progileImage
          this.setState({image: path});
          console.log("이미지주소 22 " + this.state.image)
          // this.state.userInfo = res.data
          console.log('userinfo', this.state.userInfo);
          // console.log(JSON.stringify(this.state.userinfo))
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
            <img src={this.state.image} alt="" width="75%"></img>
          </Col>
          <Col>
            <div>이메일: {this.state.userInfo.email}</div>
            <div>이름: {this.state.userInfo.username}</div>
            <div>성별: {this.state.userInfo.gender === 1 ? "여성" : "남성"}</div>
            <div>닉네임: {this.state.userInfo.email}</div>
            <div>선호 카테고리: 1순위-{this.state.userInfo.category1}/2순위-{this.state.userInfo.category2}/3순위-{this.state.userInfo.category3}</div>
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

