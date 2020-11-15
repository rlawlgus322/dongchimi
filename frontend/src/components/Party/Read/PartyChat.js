import React, { Component } from 'react';

class PartyChat extends Component {


  render() {
    return (
      <>
        파티 채팅
        <button className="partybutton" onClick={() => {
          console.log('화상채팅 시작');
          console.log('url', this.props.rtcurl);
          // this.props.history.push(`/party/room/`)
          const win = window.open(`/party/room/${this.props.rtcurl}`, "_balnk");
          win.focus();
        }}>화상채팅시작</button>
      </>
    )
  }
}

export default PartyChat;