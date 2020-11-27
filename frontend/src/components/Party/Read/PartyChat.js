import React, { Component } from 'react';

class PartyChat extends Component {

  render() {
    return (
      <>
        <button className="partybutton" style={{ width: "200px", height: "70px", marginTop: "30px", marginLeft: "300px", backgroundColor: "red" }} onClick={() => {
          if (!this.props.isStart) {
            alert("아직 시작되지 않은 파티입니다")
            return;
          }
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