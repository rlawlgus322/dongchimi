import React, { Component } from 'react';
import PartyInfo from 'components/Party/Read/PartyInfo';
import PartyComment from 'components/Party/Read/PartyComment';
import PartyChat from 'components/Party/Read/PartyChat';
import PartyApplicant from 'components/Party/Read/PartyApplicant';
import api from 'utils/api';
import './mainParty.css'
import styled from 'styled-components';

const PartyReadBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  margin: 0 10vw;
  min-height: 100vh;
  padding-top: 20px;
  box-sizing:border-box;
`;

class PartyRead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      type: 1,
      isWriter: false,
    }
  }

  componentDidMount() {
    if (this.props.match.path === "/party/:id") { // 그냥 파티
      this.setState({ type: 1 });
    } else if (this.props.match.path === "/party/join/:id") { // 참가한 파티
      this.setState({ type: 2 });
    } else if (this.props.match.path === "/party/open/:id") { // 내가 연 파티
      this.setState({ type: 3 });
    }
    // console.log('read this.props', this.props)
    api.get(`/hobby/chimi/${this.props.match.params.id}`, {
      headers: {
        accessToken: sessionStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        // console.log('party read', data);
        this.setState({ data: data });
        if (data.chimi.userId === Number(sessionStorage.getItem('uid'))) {
          this.setState({ isWriter: true });
        }
      }).catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <PartyReadBody>
        <PartyInfo
          type={this.state.type}
          data={this.state.data}
          isWriter={this.state.isWriter}
        ></PartyInfo>
        <div className='row'>
          <div className='col-6'>
            <div className="detail">Detailed Description</div>
            {/* {
              this.state.data.chimi !== undefined &&
              <PartyOpener nickname={this.state.data.nickname} />
            } */}
            {
              this.state.data.chimi !== undefined &&
              <div className="maindesc" dangerouslySetInnerHTML={{ __html: this.state.data.chimi.description }} />
            }
          </div>
          <div className='col-6'>
            {
              this.state.type === 1 &&
              this.state.data.chimi !== undefined &&
              <PartyComment hid={this.state.data.chimi.hid} userId={this.state.data.chimi.userId}></PartyComment>
            }
            {
              this.state.data.chimi !== undefined &&
              this.state.type === 3 &&
              <PartyApplicant chimiId={this.props.match.params.id} />
            }
            {
              (this.state.type === 2 || this.state.type === 3) &&
              this.state.data.chimi !== undefined &&
              this.state.data.chimi.isstart &&
              <PartyChat rtcurl={this.state.data.chimi.rtcurl}></PartyChat>
            }
            {
              (this.state.type === 2 || this.state.type === 3) &&
              this.state.data.chimi !== undefined &&
              !this.state.data.chimi.isstart &&
              <div className="isStart" style={{ width: "350px", marginLeft: "200px", paddingLeft: "25px", clear: "both" }}>파티 시작일까지 아직 기다려주세요!</div>
            }
          </div>
        </div>
      </PartyReadBody>
    )
  }
}

export default PartyRead;
