import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PartyRegister from './PartyRegister';
import PartyMembers from './PartyMembers';
import { Row} from 'react-bootstrap';
import styled from 'styled-components';
import './style.css'

const Partyinfo = styled.h1`
 margin-top: 20px;
 margin-left: 30px;
 font-size: 20px;
`

function PartyInfo(props) {
  const { type, data, isWriter } = props;
  const imgSrc = "https://k3a409.p.ssafy.io";
  useEffect(() => {
    console.log('data',data);
    // if (data.length > 0) {
    //     if (data.chimi.image === null) {
    //         imgSrc += '/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png';
    //     } else {
    //         imgSrc = imgSrc + data.chimi.image;
    //     }
    // }
  });
  
  return (
    <>
      <Row>
        {
          data.chimi !== undefined &&
          
          <img src={data.chimi.image!==null?imgSrc+data.chimi.image:imgSrc+'/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'}
            style={{
                width : "50%",
                marginLeft : "50px"
            }}
          ></img>
          
        //   <div
        //     style={{
        //       backgroundImage: `url(https://k3a409.p.ssafy.io${data.chimi.image !== null ? data.chmage : '/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'})`,
        //       textAlign: "center",imi.i
        //       backgroundRepeat: "no-repeat",
        //       backgroundSize: "cover",
        //       backgroundPosition: "center",
        //       width : "1200px",
        //       position: "relative",
        //       overflow: "hidden",
        //     }}
        //   />
        }
        <div >
          {
            data.chimi !== undefined &&
            <h1>{data.chimi.name}</h1> &&
            <div>
              <div className="title partytitle">{data.chimi.name}</div><br></br>
              <div className="writer"> 작성자 : {data.nickname}</div><br></br>
              <div className="partydesc">{data.chimi.summary}</div> <br></br>
              <div><span style={{
                fontFamily : "Poppins",
                fontSize : "24px",
                fontStyle : "italic",
                marginLeft: "25%",
                fontWeight : "800",
                marginBottom : "70px"
              }}>category</span>
              <span style={{
                marginLeft: "5%",
                color : "black",
                fontSize : "20px",
                marginBottom : "70px"
                }}>{data.chimi.category}</span></div> <br></br>
                <div>
                <span style={{
                fontFamily : "Poppins",
                fontSize : "24px",
                fontStyle : "italic",
                marginLeft: "25%",
                fontWeight : "800",
                marginBottom : "70px"
              }}>Recruitment&nbsp;number</span>
              <span style={{
                marginLeft: "5%",
                color : "black",
                fontSize : "20px",
                }}>{data.chimi.totalnum}</span></div> <br></br>
              
              <span style={{
                fontFamily : "Poppins",
                fontSize : "24px",
                fontStyle : "italic",
                marginLeft: "25%",
                fontWeight : "800"
              }}>Current&nbsp;number&nbsp;of&nbsp;applicants</span>
              <span style={{
                marginLeft: "5%",
                color : "black",
                fontSize : "20px",
                }}>{data.chimi.curnum}</span><br></br>
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
            <div style={{marginLeft : "45%", marginTop : "20px"}}>
              <button className="partybutton" onClick={() => props.history.push('/party/update')}>수정</button>
              <button className="partybutton" onClick={() => console.log('삭제')}>삭제</button>
            </div>
          }
          {
            type === 1 &&
            data.chimi !== undefined &&
            !data.chimi.isstart &&
            <PartyRegister data={data} />
          }
          {
            type === 1 &&
            data.chimi !== undefined &&
            data.chimi.isstart &&
            <div className="isStart">시작된 파티입니다</div>
          }
        </div>
      </Row>
    </>
  )
}

export default withRouter(PartyInfo);
