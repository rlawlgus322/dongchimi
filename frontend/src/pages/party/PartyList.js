import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Parties from '../../components/Party/List/Parties';

const data = [
  { id: '1', bangjang: 'a', name: '뜨개질', desc: '뜨개질하자', total: '1', stars: '6', views: '1', imgSrc: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/3960e6fd2eed33ded85590499d95b729/7FB9DDA2-C9B7-473B-BD78-282A33AA084F-9716-000009E931E8FB4C_file.jpg', },
  { id: '2', bangjang: 'b', name: '십자수', desc: '십자수하자', total: '2', stars: '5', views: '2', imgSrc: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/9da88db39679dff1cca87ad97457f03c/3F212117-1473-47F6-AD9F-531326117EAB-95867-00005C1428239F3C_file.jpg', },
  { id: '3', bangjang: 'c', name: '아이패드 그림 그리기', desc: '그림그리자', total: '4', stars: '3', views: '3', imgSrc: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/6d852bb8f8e6bac64ee4885c8639d097/395C5731-B29B-41BD-B8AF-B3404010BA02-4569-0000633402BC1A72_file.jpg', },
  { id: '4', bangjang: 'd', name: '프랑스 자수', desc: '자수하자', total: '3', stars: '3', views: '4', imgSrc: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/efdbdecdd9a774dfc21f901d1dddd161/06092924-2FB5-4719-9749-0EDD5D99B7AF-70098-000043269120AC52_file.jpg', },
  { id: '5', bangjang: 'e', name: '모자 만들기', desc: '모자만들자', total: '4', stars: '2', views: '5', imgSrc: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/85a137826f2cb611dc1902fd4275f583/B5CE2CB4-27DE-4E64-A6E2-DA2F5CFC4237-84273-0000525A3F2EBC0E_file.jpg', },
  { id: '6', bangjang: 'f', name: '뜨개질', desc: '뜨개질하자', total: '5', stars: '1', views: '6', imgSrc: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/3022a93d4e401e8d7e7a792e6f0ec97a/AC214911-3B7D-4B19-AFF9-4584F1303FA6-95867-00005C13880922A8_file.jpg', },
  { id: '7', bangjang: 'g', name: '뜨개질', desc: '뜨개질하자', total: '6', stars: '2', views: '7', imgSrc: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/f5d5e8813f66f1b203a43d24cdeaad2e/DA87FE56-B1CD-454E-9B25-21795C025FA1-65880-000045972081C515_file.jpg', },
]

function PartyList({ history }) {
  // 요청 상태 관리
  const [parties, setParties] = useState(data);

  // 요청 작업
  useEffect(() => {
    // 통신 후 결과값 넣어주기
    setParties(data);
  })
  return (
    <>
      {/** 검색창 */}
      검색창 <br></br>
      {/** 카테고리 */}
      카테고리 <br></br>
      {/** 정렬 기준, 파티 개설하기 */}
      정렬 기준, 파티 개설 <br></br>
      <button
        onClick={() => history.push('/party/write')}
      >파티 만들기</button>
      {/** 카드 */}
      <Parties
        parties={parties}
      ></Parties>
      {/** 페이지네이션 */}
      페이지네이션
    </>
  );
}

export default withRouter(PartyList);
