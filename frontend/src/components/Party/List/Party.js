import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './party.css';

function Party(props) {
  const { isShow, party, delay } = props;

  useEffect(() => {
    const thisDOM = document.getElementById(`partyItem${delay}${isShow}`);
    setTimeout(() => {
      thisDOM.style.opacity = isShow ? "1" : "0";
      thisDOM.style.zIndex = isShow ? "5" : "0"
      thisDOM.style.padding = isShow ? "0px" : "110px";
    }, delay)
  }, [isShow, delay]);

  return (
    <div className="item" id={`partyItem${delay}${isShow}`}
      onClick={() => props.history.push(`/party/${props.party.chimi.hid}`)}
    >
      <div className="box" style={{
        backgroundImage: `url(https://k3a409.p.ssafy.io${props.party.chimi.image !== null ? props.party.chimi.image : '/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'})`,
      }}>
        <div className="cover">
          <h2 className="title">{party.chimi.name}</h2>
          <p className="content">파티장 : {party.nickname}</p>
          <p className="content">모집인원 : {party.chimi.totalnum}</p>
          <p className="content">현재 참여 인원 : {party.chimi.curnum}</p>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Party);
