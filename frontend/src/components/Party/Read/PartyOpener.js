import React, { Component } from 'react';

class PartyOpener extends Component {
  render() {
    return (
      <div>
        <h3>파티 연 사람 : {this.props.name}</h3>
      </div>
    )
  }
}

export default PartyOpener;
