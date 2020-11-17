import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import "./style.css"

function PartyMembers(props) {
  const [ids, setIds] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    function getMemberID() {
      api.get(`hobby/enrolment/${props.hid}`)
        .then(({ data }) => {
          setIds(data);
        }).catch((err) => {
          console.log(err);
        })
    }
    getMemberID();
  }, [props.hid]);

  useEffect(() => {
    async function getMembers() {
      if (ids.length <= 0) return;
      let list = [];
      for (let i = 0; i < ids.length; i++) {
        await api.get(`/auth/userinfoby/${ids[i].enrolmentPK.userId}`)
          .then(({ data }) => {
            list.push(data);
          }).catch((err) => {
            console.log(err);
          })
      }

      setMembers(list);
    }
    getMembers();
  }, [ids]);

  const memberList = members.map((member, index) => {
    return (
      <div className="badge" key={index}>
        <img
          style={{ height: "105px" }}
          src='https://k3a409.p.ssafy.io/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'
          alt="profile"
        />
        <div className="ribbon">{member.nickname}</div>
      </div>
    )
  })

  return (
    <>
      <div className="member">멤버 목록</div>
      {members.length === 0 ? <h2 className="memberlist">참가자가 없습니다</h2> : memberList}
    </>
  )
}

export default PartyMembers;
