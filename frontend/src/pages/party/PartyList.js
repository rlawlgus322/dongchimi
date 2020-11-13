import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Parties from '../../components/Party/List/Parties';
import Pagination from 'react-js-pagination';
import api from '../../utils/api';
import './party.css';

function PartyList({ history }) {
  const [parties, setParties] = useState([]);
  const [page, setPage] = useState(1); // 페이징
  const [keyword, setKeyword] = useState(""); // 검색어
  const logged = sessionStorage.getItem('token') === null ? false : true;

  useEffect(() => {
    getLists();
  }, [])

  useEffect(() => {
    getLists();
  }, [page])

  function getLists() {
    api.get('/hobby/chimi', {
      params: {
        page: page - 1,
        size: 12
      }
    }, {
      headers: {
        accessToken: sessionStorage.getItem('token')
      }
    }).then(({ data }) => {
      // console.log('party list', data);
      setParties(data);
    }).catch((err) => {
      console.log(err);
    })
  }

  function handlePageChange(pageNumber) {
    console.log('active page ', pageNumber);
    setPage(pageNumber);
  }

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
          <option>오래된순</option>
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
          activePage={page}
          itemsCountPerPage={12}
          totalItemsCount={30} // 전체 값 가져온 뒤에 수정 필요!!
          pageRangeDisplayed={5}
          itemClass="page-item"
          linkClass="page-link"
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default withRouter(PartyList);
