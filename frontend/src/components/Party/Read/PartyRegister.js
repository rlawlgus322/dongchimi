import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import api from 'utils/api';
import { toast } from 'react-toastify';

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

  register() {
    if (this.state.token === null) {
      toast.warn('😫 로그인이 필요합니다', {
        position: "bottom-right",
        autoClose: 3000,
      })
      return;
    }
    api.post(`/hobby/apply/${this.state.data.chimi.hid}`, {}, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      // console.log(res)
      // console.log("레지스터 " + this.state.applicated)
      toast.success('✅ 신청 완료', {
        position: "bottom-right",
        autoClose: 3000,
      })
      this.setState({ applicated: !this.state.applicated })
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
      // console.log(res);
      toast.success('✅ 신청 취소 완료', {
        position: "bottom-right",
        autoClose: 3000,
      })
      this.setState({ applicated: !this.state.applicated })
    }).catch((err) => {
      console.log(err);
    })
  }

  save() {
    // console.log('보관함에 저장');
    if (this.state.token === null) {
      toast.warn('😫 로그인이 필요합니다', {
        position: "bottom-right",
        autoClose: 3000,
      })
      return;
    }
    api.post(`/hobby/storage/${this.state.data.chimi.hid}`, {}, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      // console.log(res);
      toast.success('✅ 보관함 저장 완료', {
        position: "bottom-right",
        autoClose: 3000,
      })
      this.setState({ stored: !this.state.stored })
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
      // console.log(res);
      toast.success('✅ 보관함 제거 완료', {
        position: "bottom-right",
        autoClose: 3000,
      })
      this.setState({ stored: !this.state.stored })
    }).catch((err) => {
      console.log(err);
    })
  }

  recommend() {
    if (this.state.token === null) {
      toast.warn('😫 로그인이 필요합니다', {
        position: "bottom-right",
        autoClose: 3000,
      })
      return;
    }
    api.put(`/hobby/chimi/recommend/${this.state.data.chimi.hid}`, {}, {
      headers: {
        accessToken: this.state.token,
      }
    }).then((res) => {
      // console.log(res);
      toast.success('✅ 추천 완료', {
        position: "bottom-right",
        autoClose: 3000,
      })
      this.setState({ recommend: !this.state.recommend })
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
      // console.log(res);
      toast.success('✅ 추천 취소 완료', {
        position: "bottom-right",
        autoClose: 3000,
      })
      this.setState({ recommend: !this.state.recommend })
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <>
        {
          this.state.uid !== this.state.data.chimi.userId &&
          <div style={{ marginLeft: "22%" }}>
            {!this.state.applicated && <button className="partybutton" onClick={this.register.bind(this)}>신청하기</button>}
            {this.state.applicated && <button className="partybutton" onClick={this.unregister.bind(this)}>신청취소하기</button>}
            {!this.state.stored && <button className="partybutton" onClick={this.save.bind(this)}>보관함에 저장</button>}
            {this.state.stored && <button className="partybutton" onClick={this.remove.bind(this)}>보관함에서 삭제</button>}
            {!this.state.recommend && <button className="partybutton" onClick={this.recommend.bind(this)}>추천하기</button>}
            {this.state.recommend && <button className="partybutton" onClick={this.unrecommend.bind(this)}>추천취소</button>}
          </div>
        }
      </>
    )
  }
}

export default withRouter(PartyRegister);
