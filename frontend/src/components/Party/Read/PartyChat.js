import React, { Component } from 'react';

class PartyChat extends Component {
  startFaceChat() {
    console.log('화상채팅 시작')
  }

  render() {
    return (
      <>
        파티 채팅
        <button onClick={this.startFaceChat.bind(this)}>화상채팅시작</button>
      </>
    )
  }
}

export default PartyChat;