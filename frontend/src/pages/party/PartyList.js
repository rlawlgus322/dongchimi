import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Parties from '../../components/Party/List/Parties';
import Pagination from 'react-js-pagination';
import api from '../../utils/api';

function PartyList({ history }) {
  const categories = [
    "전체", "유화", "수채화", "파스텔", "가죽", "뜨개질", "비즈",
    "일러스트", "이모티콘", "편집", "촬영",
    "한식", "양식", "일식", "중식", "세계음식",
    "헬스", "홈트", "다이어트", "작곡", "작사",
    "타악기", "현악기", "관악기", "댄스",
  ]
  const [parties, setParties] = useState([]);
  const [page, setPage] = useState(1); // 페이징
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [keyword, setKeyword] = useState(null); // 검색어
  const [category, setCategory] = useState(null); // 카테고리
  const logged = sessionStorage.getItem('token') === null ? false : true;

  useEffect(() => {
    getLists();
  }, [page, category])

  function getLists() {
    api.get('/hobby/chimi', {
      params: {
        page: page - 1,
        size: 12,
        name: keyword,
        category: category,
      },
      headers: {
        accessToken: sessionStorage.getItem('token')
      }
    }).then(({ data }) => {
      // console.log('party list', data);
      setParties(data.chimiResponse);
      setTotalItemsCount(data.cnt);
    }).catch((err) => {
      console.log(err);
    })
  }

  function handlePageChange(pageNumber) {
    // console.log('active page ', pageNumber);
    setPage(pageNumber);
  }

  function handleKeywordChange(e) {
    // console.log('keyword', e.target.value);
    if (e.target.value === '') {
      setKeyword(null);
    } else {
      setKeyword(e.target.value);
    }
  }

  function handleCategoryChange(e) {
    // console.log(e);
    // console.log(e.target.textContent);
    if (e.target.textContent === "전체") {
      setCategory(null);
    } else {
      setCategory(e.target.textContent);
    }
  }

  return (
    <>
      {/** 카테고리 */}
      <div style={{ textAlign: "center" }}>
        카테고리 <br></br>
        <ul>
          {categories.map((cate, index) => (
            <li key={index}
              onClick={handleCategoryChange}
            >
              {cate}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ textAlign: "right" }}>
        {/** 검색창 */}
        <input type="text" placeholder="search"
          onChange={handleKeywordChange}
        />
        <button onClick={getLists}>검색</button>
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
          totalItemsCount={totalItemsCount}
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
