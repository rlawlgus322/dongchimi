import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './party.css';

class Party extends Component {
  render() {
    return (
      <div className="col-md-4 col-lg-3 item"
        onClick={() => this.props.history.push(`/party/${this.props.party.chimi.hid}`)}
      >
        <div className="box" style={{
          backgroundImage: `url(https://k3a409.p.ssafy.io${this.props.party.chimi.image !== null ? this.props.party.chimi.image : '/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'})`,
        }}>
          <div className="cover">
            <h2 className="title">{this.props.party.chimi.name}</h2>
            <p className="content">파티장 : {this.props.party.nickname}</p>
            <p className="content">모집인원 : {this.props.party.chimi.totalnum}</p>
            <p className="content">현재 참여 인원 : {this.props.party.chimi.curnum}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Party);
