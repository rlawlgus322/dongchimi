import React, { Component } from 'react';
import api from 'utils/api';
import axios from 'axios';

class RecommendList extends Component {
  state = {
    userEmail: ''
  }

  componentDidMount() {
    api.get('auth/userinfo/', {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    })
      .then(res => {
        this.setState({ userEmail: res.data.email })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getRecommend() {
    axios.get(`https://k3a409.p.ssafy.io:8090/item?email=${this.state.userEmail}`)
      .then(({ data }) => {
        console.log("유저 " + JSON.stringify(data))
      })
      .catch(err => {
        console.log(err)
      })
    axios.get(`https://k3a409.p.ssafy.io:8090/itemuser?email=${this.state.userEmail}`)
      .then(({ data }) => {
        console.log("아이템 유저 " + JSON.stringify(data))
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <button onClick={this.getRecommend.bind(this)}>
          추천 취미 보기
        </button>
      </div>
    );
  }
}

export default RecommendList;