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
      // console.log(this_token)
      api.get('auth/userinfo/', {
        headers: {
          accessToken: this_token,
        }
      })
        .then(res => {
          // console.log("res " + JSON.stringify(res))
          // const userinfo = res.data
          this.setState({ userInfo: res.data });
          // console.log("이미지 주소 " + res.data.profileImage)
          this.setState({image: 'https://k3a409.p.ssafy.io' + res.data.profileImage});
          // console.log("이미지주소 22 " + this.state.image)
          // this.state.userInfo = res.data
          // console.log('userinfo', this.state.userInfo);
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
            <br/>
            <h4>이메일: {this.state.userInfo.email}</h4>
            <h4>이름: {this.state.userInfo.username}</h4>
            <h4>성별: {this.state.userInfo.gender === 1 ? "여성" : "남성"}</h4>
            <h4>닉네임: {this.state.userInfo.email}</h4>
            <h4>선호 카테고리: 1순위-{this.state.userInfo.prefer1}/<br/>2순위-{this.state.userInfo.prefer2}/3순위-{this.state.userInfo.prefer3}</h4>
          </Col>
        </Row>
        <MypageTab></MypageTab>
      </Container>
    );
  }
}

export default MyPage;

