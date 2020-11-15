import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Parties from '../../components/Party/List/Parties';
import Pagination from 'react-js-pagination';
import api from '../../utils/api';
import styled from 'styled-components';

const PartyListBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CategoryContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  width: 650px;
`;

const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  color: inherit;
`;

const CategoryListItem = styled.li`
  margin-right: 20px;
  flex-shrink: 0;
  color: inherit;
  margin-bottom: 20px;
  cursor: pointer;
`;

const WholeCategoryList = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-color: black;
  color: white;
  width: 0px;
  height: 0px;
  transition: all 0.2s ease-in-out;
  font-size: 0px;
  &.show {
    width: 650px;
    height: 110px;
    padding: 10px;
    font-size: 1em;
  }
`;

const MoreCategoryButton = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

function PartyList({ history }) {
  const categories = [
    '전체',
    '유화',
    '수채화',
    '파스텔',
    '가죽',
    '뜨개질',
    '비즈',
    '일러스트',
    '이모티콘',
    '편집',
    '촬영',
    '한식',
    '양식',
    '일식',
    '중식',
    '세계음식',
    '헬스',
    '홈트',
    '다이어트',
    '작곡',
    '작사',
    '타악기',
    '현악기',
    '관악기',
    '댄스',
  ];
  const [parties1, setParties1] = useState([]);
  const [parties2, setParties2] = useState([]);
  const [page, setPage] = useState(1); // 페이징
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [keyword, setKeyword] = useState(null); // 검색어
  const [category, setCategory] = useState(null); // 카테고리
  const [isEven, setIsEven] = useState(true);
  const logged = sessionStorage.getItem('token') === null ? false : true;

  useEffect(() => {
    getLists();
  }, [page, category]);

  function getLists() {
    api
      .get('/hobby/chimi', {
        params: {
          page: page - 1,
          size: 12,
          name: keyword,
          category: category,
        },
        headers: {
          accessToken: sessionStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        if (isEven) {
          setParties1(data.chimiResponse);
        } else {
          setParties2(data.chimiResponse);
        }
        setIsEven(!isEven);
        setTotalItemsCount(data.cnt);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePageChange(pageNumber) {
    setPage(pageNumber);
  }

  function handleKeywordChange(e) {
    if (e.target.value === '') {
      setKeyword(null);
    } else {
      setKeyword(e.target.value);
    }
  }

  function handleCategoryChange(e) {
    if (e.target.textContent === '전체') {
      setCategory(null);
    } else {
      setCategory(e.target.textContent);
    }
  }

  function showWholeCategory() {
    const wholeCategory = document.querySelector('.wholeCategory');
    wholeCategory.classList.add('show');
  }

  function closeWholeCategory(e) {
    const wholeCategory = document.querySelector('.wholeCategory');
    wholeCategory.classList.remove('show');
  }

  return (
    <PartyListBody>
      <CategoryContainer>
        <CategoryList>
          {categories.map(
            (category, index) =>
              index < 10 && (
                <CategoryListItem key={index} onClick={handleCategoryChange}>
                  {category}
                </CategoryListItem>
              ),
          )}
        </CategoryList>
        <MoreCategoryButton onMouseOver={showWholeCategory}>
          •••
        </MoreCategoryButton>
        <WholeCategoryList
          onMouseLeave={closeWholeCategory}
          className="wholeCategory"
        >
          <CategoryList>
            {categories.map((category, index) => (
              <CategoryListItem key={index} onClick={handleCategoryChange}>
                {category}
              </CategoryListItem>
            ))}
          </CategoryList>
        </WholeCategoryList>
      </CategoryContainer>
      <div style={{ textAlign: 'right' }}>
        {/** 검색창 */}
        <input
          type="text"
          placeholder="search"
          onChange={handleKeywordChange}
        />
        <button onClick={getLists}>검색</button>
        <br></br>
        {logged && (
          <button onClick={() => history.push('/party/write')}>
            파티 만들기
          </button>
        )}
      </div>
      {/** 카드 */}
      <Parties parties1={parties1} parties2={parties2} isEven={isEven}></Parties>
      {/** 페이지네이션 */}
      <div style={{ textAlign: 'center' }}>
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
    </PartyListBody>
  );
}

export default withRouter(PartyList);
