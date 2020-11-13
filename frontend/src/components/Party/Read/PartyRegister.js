import React, { Component } from 'react';
import api from '../../../utils/api';

class PartyRegister extends Component {
  constructor(props) {
    super(props);
    // console.log('constructor', this.props);
    this.state = {
      token: sessionStorage.getItem('token'),
      uid: Number(sessionStorage.getItem('uid')),
      // hid: this.props.hid,
      data: this.props.data,
      applicated: this.props.data.applicated,
      stored: this.props.data.stored,
      recommend: this.props.data.recommend,
    }
  }
  
  // componentDidMount() {
  //   console.log("레지스터프롭 " + JSON.stringify(this.state.data))
  //   console.log("세션 uid " + this.state.uid)
  //   console.log("데이터 userId " + this.state.data.chimi.userId)
  // }

  register() {
    if (this.state.token === null) {
      alert('로그인이 필요합니다')
      return;
    }
    api.post(`/hobby/apply/${this.state.data.chimi.hid}`, {}, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      console.log(res)
      // console.log("레지스터 " + this.state.applicated)
      this.setState({applicated: !this.state.applicated})
      // console.log("레지스터 " + this.state.applicated)
    }).catch((err) => {
      console.log(err);
    })
  }

  unregister() {
    api.delete(`/hobby/apply/applicant/${this.state.data.chimi.hid}`, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      console.log(res);
      this.setState({applicated: !this.state.applicated})
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
    api.post(`/hobby/storage/${this.state.data.chimi.hid}`, {}, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      console.log(res);
      this.setState({stored: !this.state.stored})
    }).catch((err) => {
      console.log(err);
    })
  }

  remove() {
    api.delete(`/hobby/storage/${this.state.data.chimi.hid}`, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      console.log(res);
      this.setState({stored: !this.state.stored})
    }).catch((err) => {
      console.log(err);
    })
  }

  recommend() {
    if (this.state.token === null) {
      alert('로그인이 필요합니다');
      return;
    }
    api.put(`/hobby/chimi/recommend/${this.state.data.chimi.hid}`, {}, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      console.log(res);
      this.setState({recommend: !this.state.recommend})
    }).catch((err) => {
      console.log(err);
    })
  }

  unrecommend() {
    api.put(`/hobby/chimi/unrecommend/${this.state.data.chimi.hid}`, {}, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      console.log(res);
      this.setState({recommend: !this.state.recommend})
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        {this.state.uid !== this.state.data.chimi.userId &&
          <div>
            {!this.state.applicated && <button onClick={this.register.bind(this)}>신청하기</button>}
            {this.state.applicated && <button onClick={this.unregister.bind(this)}>신청취소하기</button>}
            {!this.state.stored && <button onClick={this.save.bind(this)}>보관함에 저장</button>}
            {this.state.stored && <button onClick={this.remove.bind(this)}>보관함에서 삭제</button>}
            {!this.state.recommend && <button onClick={this.recommend.bind(this)}>추천하기</button>}
            {this.state.recommend && <button onClick={this.unrecommend.bind(this)}>추천취소</button>}
          </div>
          // <div>
          //   {this.state.applicated === false ? <button onClick={this.register.bind(this)}>신청하기</button>
          //     : <button onClick={this.unregister.bind(this)}>신청취소하기</button>
          //   }
          //   {this.state.stored === false ? <button onClick={this.save.bind(this)}>보관함에저장</button>
          //     : <button onClick={this.remove.bind(this)}>보관함에서삭제</button>
          //   }
          //   {this. state.recommend === false ? <button onClick={this.recommend.bind(this)}>추천하기</button>
          //     : <button onClick={this.unrecommend.bind(this)}>추천취소하기</button>
          //   }
          // </div>
        } 
      </div>
    )
  }
}

export default PartyRegister;
