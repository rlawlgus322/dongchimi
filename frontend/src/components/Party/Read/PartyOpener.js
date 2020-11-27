import React, { Component } from 'react';

class PartyOpener extends Component {
  render() {
    // console.log()
    return (
      <div>
        <h3>파티 연 사람 : {this.props.nickname}</h3>
      </div>
    )
  }
}

export default PartyOpener;
