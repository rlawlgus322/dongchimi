import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/partycard.css';

class Party extends Component {
  render() {
    const backgroundImage = {
      backgroundImage: `url(${this.props.party.imgSrc})`
    }
    return (
      <div className="col-md-4 col-lg-3 item"
        onClick={() => this.props.history.push(`/party/${this.props.party.id}`)}
      >
        <div className="box" style={backgroundImage}>
          <div className="cover">
            <h3 className="name">{this.props.party.name}</h3>
            <p className="title">파티장 : {this.props.party.bangjang}</p>
            <p className="title">모집인원 : {this.props.party.total}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Party);