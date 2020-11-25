import React, { useEffect, useState } from 'react';
import api from 'utils/api';
import "./style.css"
import UserScore from './UserScoer';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

function PartyMembers(props) {
  const [ids, setIds] = useState([]);
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState(0);

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

  function handleModalOpen() {
    if (sessionStorage.getItem('token') === null) return;
    setOpen(true);
  }

  function handleModalClose() {
    setOpen(false);
  }

  function handleUserRate(rate) {
    // console.log('members', rate);
    setRate(rate);

  }

  const memberList = members.map((member, index) => {
    return (
      <React.Fragment key={index}>
        <div className="badge"
          onClick={() => { handleModalOpen() }}
        >
          <img
            style={{ height: "105px" }}
            src='https://k3a409.p.ssafy.io/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'
            alt="profile"
          />
          <div className="ribbon">{member.nickname}</div>
        </div>
        <Dialog open={open} onClose={handleModalClose}>
          <DialogTitle>별점</DialogTitle>
          <DialogContent style={{ width: "30vw", height: "10vh" }}>
            <UserScore user={member} handleUserRate={handleUserRate}></UserScore>
          </DialogContent>
          <DialogActions>
            <button onClick={() => {
              api.put(`/auth/userinfo/${member.nickname}`, {}, {
                params: {
                  star: rate,
                },
                headers: {
                  accessToken: sessionStorage.getItem('token')
                }
              }).then((res) => {
                // console.log('rate', res);
                handleModalClose();
              }).catch((err) => {
                console.log(err);
              })
            }}>확인</button>
            <button onClick={() => { handleModalClose() }}>취소</button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
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
