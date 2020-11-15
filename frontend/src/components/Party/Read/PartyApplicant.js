import { Component } from "react";
import React from "react";
import api from '../../../utils/api';

class PartyApplicant extends Component {
  state = {
    applicants: [],
    userInfoList: [],
    chimiId: this.props.chimiId,
  }

  componentDidMount() {
    this.getApplicants();
  }

  async componentDidUpdate() {
    const users = [];
    for (let i = 0; i < this.state.applicants.length; i++) {
      await api.get(`/auth/userinfoby/${this.state.applicants[i].applicationPK.userId}`)
        .then(({ data }) => {
          // console.log('data', data);
          users.push(data);
        }).catch((err) => {
          console.log(err);
        })
    }
    if (users.length !== 0 && users.length !== this.state.userInfoList.length)
      this.setState({ userInfoList: users });
  }

  getApplicants() {
    api.get(`/hobby/apply/moderator/${this.props.chimiId}`, {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      // console.log('getApplicants', data);
      this.setState({ applicants: data });
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    // console.log('applicant chimiId', this.state.chimiId);
    const applicants = this.state.userInfoList.map((userInfo, index) => {
      // console.log('map ', userInfo);
      return (
        <div key={index}>
          지원한 사람 : {userInfo.nickname}
          별점 : {userInfo.star}
          <button onClick={() => {
            // console.log('accept', userInfo)
            api.post('/hobby/enrolment', {
              chimiId: this.state.applicants[index].applicationPK.chimiId,
              userId: this.state.applicants[index].applicationPK.userId,
            }, {
              headers: {
                accessToken: sessionStorage.getItem('token'),
              }
            }).then((res) => {
              // console.log('수락 성공');
              // console.log(res);
              this.getApplicants();
            }).catch((err) => {
              console.log(err);
            })
          }}>수락</button>
          <button onClick={() => {
            api.delete('/hobby/apply/moderator', {
              headers: {
                accessToken: sessionStorage.getItem('token')
              },
              data: {
                chimiId: this.state.applicants[index].applicationPK.chimiId,
                userId: this.state.applicants[index].applicationPK.userId,
              }
            }).then((res) => {
              // console.log('거절 성공')
              // console.log(res);
              this.getApplicants();
            }).catch((err) => {
              console.log(err);
            })
          }}>거절</button>
        </div >
      )
    })

    return (
      <>
        { this.state.applicants.length === 0 ? <h2>신청자가 없습니다</h2> : applicants}
      </>
    )
  }
}

export default PartyApplicant;