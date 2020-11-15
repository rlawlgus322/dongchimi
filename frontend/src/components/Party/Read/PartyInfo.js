import React from 'react';
import { withRouter } from 'react-router-dom';
import PartyRegister from './PartyRegister';
import PartyMembers from './PartyMembers';

function PartyInfo(props) {
  const { type, data, isWriter } = props;

  return (
    <>
      <div className='row'>
        {
          data.chimi !== undefined &&
          <div className='col-md-5 col-8'
            style={{
              backgroundImage: `url(https://k3a409.p.ssafy.io${data.chimi.image !== null ? data.chimi.image : '/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'})`,
              textAlign: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "350px",
              position: "relative",
              overflow: "hidden",
            }}
          />
        }
        <div className='col-md-7 col-8'>
          {
            data.chimi !== undefined &&
            <h1>{data.chimi.name}</h1> &&
            <div>
              제목 : {data.chimi.name}<br></br>
              설명 : {data.chimi.summary} <br></br>
              카테고리 : {data.chimi.category} <br></br>
              모집인원 : {data.chimi.totalnum} <br></br>
              현재 신청 인원 : {data.chimi.curnum} <br></br>
            </div>
          }
          {
            // type === 2 &&
            data.chimi !== undefined &&
            <PartyMembers
              hid={data.chimi.hid}
            />
          }
          {
            data.chimi !== undefined && isWriter &&
            <div>
              <button onClick={() => props.history.push('/party/update')}>수정</button>
              <button onClick={() => console.log('삭제')}>삭제</button>
            </div>
          }
          {
            type === 1 &&
            data.chimi !== undefined &&
            // !data.chimi.isstart &&
            <PartyRegister data={data} />
          }
          {
            type === 1 &&
            data.chimi !== undefined &&
            data.chimi.isstart &&
            <h2>시작된 파티입니다</h2>
          }
        </div>
      </div>
    </>
  )
}

export default withRouter(PartyInfo);
