import React, { Component } from 'react';
import PartyInfo from '../../components/Party/Read/PartyInfo';
import PartyOpener from '../../components/Party/Read/PartyOpener';
import PartyComment from '../../components/Party/Read/PartyComment';
import PartyChat from '../../components/Party/Read/PartyChat';
import PartyApplicant from '../../components/Party/Read/PartyApplicant';
import api from '../../utils/api';

class PartyRead extends Component {
  state = {
    data: [],
    type: 1,
  }

  componentDidMount() {
    if (this.props.match.path === "/party/:id") {
      this.setState({ type: 1 });
    } else if (this.props.match.path === "/party/join/:id") {
      this.setState({ type: 2 });
    } else if (this.props.match.path === "/party/open/:id") {
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
        <button
          onClick={() => this.props.history.push('/party/update')}
        >수정</button>
        <div className='row'>
          <div className='col-6'>
            {
              this.state.data.chimi !== undefined &&
              <PartyOpener nickname={this.state.data.nickname} />
            }
            {
              this.state.type === 3 &&
              <PartyApplicant />
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
              <PartyChat></PartyChat>
            }
          </div>
        </div>
      </>
    )
  }
}

export default PartyRead;
