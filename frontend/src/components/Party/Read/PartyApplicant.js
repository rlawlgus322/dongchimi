import { Component } from "react";
import React from "react";
import api from '../../../utils/api';

class PartyApplicant extends Component {
  state = {
    applicants: [],
    chimiId: this.props.chimiId,
  }

  componentDidMount() {
    this.getApplicants();
  }

  getApplicants() {
    api.get('/hobby/apply/moderator', {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      console.log('getApplicants', data);
      this.setState({ applicants: data });
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    console.log('applicant chimiId', this.state.chimiId);
    // 2안. 가져온 데이터 중 이 게시글에 맞는 데이터만 렌더한다
    const applicants = this.state.applicants.map((applicant, index) => {
      if (applicant.applicationPK.chimiId === Number(this.state.chimiId)) {
        console.log('map ', applicant);
        return (
          <div key={index}>
            지원한 사람 : {applicant.applicationPK.userId}
            <button onClick={() => {
              console.log('accept', applicant)
              api.post('/hobby/enrolment', {
                chimiId: applicant.applicationPK.chimiId,
                userId: applicant.applicationPK.userId,
              }, {
                headers: {
                  accessToken: sessionStorage.getItem('token'),
                }
              }).then((res) => {
                console.log(res);
                console.log('수락 성공');
                this.getApplicants();
              }).catch((err) => {
                console.log(err);
              })
            }}>수락</button>
            <button onClick={() => {
              console.log('거절')
            }}>거절</button>
          </div>
        )
      }
    })

    return (
      <>
        {applicants[0] === undefined ? <h2>신청자가 없습니다</h2> : applicants}
      </>
    )
  }
}

export default PartyApplicant;