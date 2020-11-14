import React, { Component } from 'react';
import PartyInfo from '../../components/Party/Read/PartyInfo';
import PartyOpener from '../../components/Party/Read/PartyOpener';
import PartyComment from '../../components/Party/Read/PartyComment';
import PartyChat from '../../components/Party/Read/PartyChat';
import PartyApplicant from '../../components/Party/Read/PartyApplicant';
import api from '../../utils/api';

class PartyRead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      type: 1,
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
        console.log('party read', data);
        this.setState({ data: data });
      }).catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <>
        <PartyInfo
          type={this.state.type}
          data={this.state.data}
        ></PartyInfo>
        <div className='row'>
          <div className='col-6'>
            {
              this.state.data.chimi !== undefined &&
              <PartyOpener nickname={this.state.data.nickname} />
            }
            {
              this.state.data.chimi !== undefined &&
              this.state.type === 3 &&
              <PartyApplicant chimiId={this.props.match.params.id} />
            }
            {
              this.state.data.chimi !== undefined &&
              <div dangerouslySetInnerHTML={{ __html: this.state.data.chimi.description }} />
            }
          </div>
          <div className='col-6'>
            {
              this.state.type === 1 &&
              this.state.data.chimi !== undefined &&
              <PartyComment hid={this.state.data.chimi.hid} userId={this.state.data.chimi.userId}></PartyComment>
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
              <h2>파티 시작일까지 아직 기다려주세요!</h2>
            }
          </div>
        </div>
      </>
    )
  }
}

export default PartyRead;
