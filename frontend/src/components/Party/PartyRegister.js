import React, { Component } from 'react';

class PartyRegister extends Component {
  register() {
    console.log('신청하기');
  }
  like() {
    console.log('찜하기');
  }
  share() {
    console.log('공유하기');
  }
  render() {
    return (
      <div>
        <button onClick={this.register}>신청하기</button>
        <button onClick={this.like}>찜하기</button>
        <button onClick={this.share}>공유하기</button>
      </div>
    )
  }
}

export default PartyRegister;