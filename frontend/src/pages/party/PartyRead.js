import React, { Component } from 'react';

class PartyRead extends Component {
  render() {
    console.log(this.props.match.params.id);
    return (
      <div className='container'>
        파티 상세
      </div>
    )
  }
}

export default PartyRead;