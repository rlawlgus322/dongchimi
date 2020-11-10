import React, { Component } from 'react';
import MypageTab from '../../components/MypageTab';
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
        this.setState({userInfo: res.data});
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

