import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Parties from '../../components/Party/List/Parties';
import Pagination from 'react-js-pagination';
import api from '../../utils/api';

function PartyList({ history }) {
  // 요청 상태 관리
  const [parties, setParties] = useState([]);
  //const [keyword, setKeyword] = useState(null);
  const logged = sessionStorage.getItem('token') === null ? false : true;

  useEffect(() => {
    api.get('/hobby/chimi', {
      headers: {
        accessToken: sessionStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        // console.log(data);
        setParties(data);
      })
    // setParties(data);
  }, [])
  return (
    <>
      {/** 카테고리 */}
      <div style={{ textAlign: "center" }}>
        카테고리 <br></br>
      </div>
      <div style={{ textAlign: "right" }}>
        {/** 검색창 */}
        <input type="text" placeholder="search" />
        <button>검색</button>
        <br></br>
        {/** 정렬 기준 */}
        정렬 기준
        <select>
          <option>최신순</option>
        </select>
        {logged &&
          <button
            onClick={() => history.push('/party/write')}
          >파티 만들기</button>
        }
      </div>
      {/** 카드 */}
      <Parties
        parties={parties}
      ></Parties>
      {/** 페이지네이션 */}
      <div style={{ textAlign: "center" }}>
        <Pagination
          hideDisabled
          activePage={1}
          itemsCountPerPage={12}
          totalItemsCount={5}
          pageRangeDisplayed={5}
          itemClass="page-item"
          linkClass="page-link"
          onChange={function () { console.log('onChange') }}
        />
      </div>
    </>
  );
}

export default withRouter(PartyList);

