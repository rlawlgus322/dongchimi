import { Component } from "react";
import React from "react";
import api from 'utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          // console.log('userinfo data', data);
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
    const applicants = this.state.userInfoList.map((userInfo, index) => {
      console.log('user info', userInfo);
      return (
        <div style={{ clear: "both", marginBottom: "20px" }} key={index}>
          <div className="badge" style={{ float: "left", width: "auto", height: "auto", margin: "1em 1.5em" }}>
            <img
              style={{ height: "65px" }}
              src='https://k3a409.p.ssafy.io/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'
              alt="profile"
            />
            <div className="ribbon">{userInfo.nickname}</div>
          </div>
          <div style={{ float: "left", marginTop: "30px" }}>
            {
              userInfo.star == 5 &&
              <span>
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
              </span>
            }
            {
              userInfo.star >= 4 && userInfo.star < 5 &&
              <span>
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
              </span>
            }
            {
              userInfo.star >= 3 && userInfo.star < 4 &&
              <span>
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
              </span>
            }
            {
              userInfo.star >= 2 && userInfo.star < 3 &&
              <span>
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
              </span>
            }
            {
              userInfo.star >= 1 && userInfo.star < 2 &&
              <span>
                <FontAwesomeIcon icon={['fas', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
              </span>
            }
            {
              userInfo.star == 0 &&
              <span>
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
                <FontAwesomeIcon icon={['far', 'star']} size="lg" color="orange" />
              </span>
            }
            <button className="partybutton" onClick={() => {
              api.post('/hobby/enrolment', {
                chimiId: this.state.applicants[index].applicationPK.chimiId,
                userId: this.state.applicants[index].applicationPK.userId,
              }, {
                headers: {
                  accessToken: sessionStorage.getItem('token'),
                }
              }).then((res) => {
                this.getApplicants();
              }).catch((err) => {
                console.log(err);
              })
            }}>수락</button>
            <button className="partybutton" onClick={() => {
              api.delete('/hobby/apply/moderator', {
                headers: {
                  accessToken: sessionStorage.getItem('token')
                },
                data: {
                  chimiId: this.state.applicants[index].applicationPK.chimiId,
                  userId: this.state.applicants[index].applicationPK.userId,
                }
              }).then((res) => {
                this.getApplicants();
              }).catch((err) => {
                console.log(err);
              })
            }}>거절</button>
          </div>
        </div >
      )
    })

    return (
      <>
        <div className="member">신청 대기자 목록</div>
        <div style={{ margin: "25px 0 25px 50px" }}>
          {this.state.applicants.length === 0 ? <h2 className="memberlist" style={{ marginLeft: "80px" }}>신청 대기자가 없습니다</h2> : applicants}
        </div>
      </>
    )
  }
}

export default PartyApplicant;