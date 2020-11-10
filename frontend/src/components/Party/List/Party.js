import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './party.css';

class Party extends Component {
  render() {
    let backgroundImage
    if (this.props.party.chimi.image !== null) {
      backgroundImage = {
        backgroundImage: `url(https://k3a409.p.ssafy.io${this.props.party.chimi.image})`
      }
    } else {
      backgroundImage = {
        backgroundImage: `url(https://lab.ssafy.com/s03-final/s03p31a409/uploads/efdbdecdd9a774dfc21f901d1dddd161/06092924-2FB5-4719-9749-0EDD5D99B7AF-70098-000043269120AC52_file.jpg)`
      }
    }
    return (
      <div className="col-md-4 col-lg-3 item"
        onClick={() => this.props.history.push(`/party/${this.props.party.chimi.hid}`)}
      >
        <div className="box" style={backgroundImage}>
          <div className="cover">
            <h2 className="title">{this.props.party.chimi.name}</h2>
            <p className="content">파티장 : {this.props.party.nickname}</p>
            <p className="content">모집인원 : {this.props.party.chimi.totalnum}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Party);
