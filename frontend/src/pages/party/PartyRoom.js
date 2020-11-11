import React, { Component } from 'react';
import FaceChat from './FaceChat';

class PartyRoom extends Component {
  render() {
    return (
      <>
        <FaceChat roomID={this.props.match.params.id} />
      </>
    )
  }
}

export default PartyRoom;