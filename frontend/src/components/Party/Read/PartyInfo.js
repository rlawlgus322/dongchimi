import React from 'react';
import { withRouter } from 'react-router-dom';
import PartyRegister from './PartyRegister';
import PartyMembers from './PartyMembers';
import { Row } from 'react-bootstrap';
import './style.css'
import styled from 'styled-components';
import moment from 'moment';

const Thumbnail = styled.img`
  min-width: 30vw;
  min-height: 50vh;
  width: 40%;
  height: 40%;
  margin-left: 50px;
  margin-top: auto;
  margin-bottom: auto;
`;

const PartySummary = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  margin-left: 10%;
  padding : 25px;
  font-size: 20px;
  min-height: 10vh;
  // height: 200px;
  width: 600px;
  color: white;
  font-weight: 600;
  background-color:  #9dcc99;
`;

const DescSpan = styled.span`
  font-family: Poppins;
  font-size: 24px;
  font-style: italic;
  margin-left: 25%;
  font-weight: 800;
  margin-bottom: 70px;
`;

const Content = styled.span`
  margin-left: 5%;
  color: black;
  font-size: 20px;
`;

function PartyInfo(props) {
  const { type, data, isWriter } = props;
  const imgSrc = "https://k3a409.p.ssafy.io";

  return (
    <>
      {
        data.chimi !== undefined &&
        <div className="title" style={{ marginTop: "0" }}>{data.chimi.name}</div>
      }
      <Row>
        {
          data.chimi !== undefined &&
          <Thumbnail src={data.chimi.image !== null ? imgSrc + data.chimi.image : imgSrc + '/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'}
            alt="thumbnail"
          ></Thumbnail>
        }
        <div >
          {
            data.chimi !== undefined &&
            <h1>{data.chimi.name}</h1> &&
            <div>
              {/* <div className="title partytitle">{data.chimi.name}</div><br></br> */}
              <div className="writer"> 작성자 : {data.nickname}</div><br></br>
              <PartySummary>{data.chimi.summary}</PartySummary> <br></br>
              <div>
                <DescSpan>category</DescSpan>
                <Content>{data.chimi.category}</Content>
              </div> <br></br>
              <div>
                <DescSpan>Recruitment&nbsp;number</DescSpan>
                <Content>{data.chimi.totalnum}</Content>
              </div> <br></br>
              <div>
                <DescSpan>Current&nbsp;number&nbsp;of&nbsp;applicants</DescSpan>
                <Content>{data.chimi.curnum}</Content>
              </div><br></br>
              <div>
                <DescSpan>Start Date</DescSpan>
                <Content>{moment(data.chimi.startdate).format('YYYY-MM-DD dddd')}</Content>
              </div>
            </div>
          }

          {
            data.chimi !== undefined && isWriter &&
            <div style={{ marginLeft: "45%", marginTop: "20px" }}>
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
          {
            // type === 2 &&
            data.chimi !== undefined &&
            <PartyMembers
              hid={data.chimi.hid}
            />
          }
        </div>
      </Row>
    </>
  )
}

export default withRouter(PartyInfo);
