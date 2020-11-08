import React, { Component } from 'react';
import api from '../../../utils/api';

class PartyRegister extends Component {
  constructor(props) {
    super(props);
    console.log('constructor', this.props);
    this.state = {
      token: sessionStorage.getItem('token'),
      hid: this.props.hid,
    }
  }

  register() {
    if (this.state.token === null) {
      alert('로그인이 필요합니다')
      return;
    }
    api.post(`/hobby/apply/${this.state.hid}`, {}, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  unregister() {
    api.delete(`/hobby/apply/applicant/${this.state.hid}`, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  save() {
    console.log('보관함에 저장');
    if (this.state.token === null) {
      alert('로그인이 필요합니다');
      return;
    }
    api.post(`/hobby/storage/${this.state.hid}`, {}, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  remove() {
    api.delete(`/hobby/storage/${this.state.hid}`, {}, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  recommend() {
    if (this.state.token === null) {
      alert('로그인이 필요합니다');
      return;
    }
    api.put(`/hobby/chimi/recommend/${this.state.hid}`, {}, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  unrecommend() {
    api.put(`/hobby/chimi/unrecommend/${this.state.hid}`, {}, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.register.bind(this)}>신청하기</button>
        <button onClick={this.unregister.bind(this)}>신청취소하기</button>
        <button onClick={this.save.bind(this)}>보관함에저장</button>
        <button onClick={this.remove.bind(this)}>보관함에서삭제</button>
        <button onClick={this.recommend.bind(this)}>추천하기</button>
        <button onClick={this.unrecommend.bind(this)}>추천취소하기</button>
      </div>
    )
  }
}

export default PartyRegister;
