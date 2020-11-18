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
  // margin-right: 20px;
  flex-shrink: 0;
  color: inherit;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  :hover {
    background-color: #d0e7ce;
  }
`;

const WholeCategoryList = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-color: black;
  color: white;
  width: 0px;
  height: 0px;
  // transition: all 0.2s ease-in-out;
  font-size: 0px;
  visibility: hidden;
  &.show {
    width: 650px;
    height: 110px;
    padding: 10px;
    font-size: 1em;
    visibility: visible;
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
  const [isFirst, setIsFirst] = useState(false);
  const logged = sessionStorage.getItem('token') === null ? false : true;

  useEffect(() => {
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
          setTotalItemsCount(data.cnt);
          if (!isFirst) {
            setParties1(data.chimiResponse);
            setParties2(data.chimiResponse);
            setIsFirst(true);
            return;
          }
          if (isEven) {
            setParties1(data.chimiResponse);
          } else {
            setParties2(data.chimiResponse);
          }
          setIsEven(!isEven);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getLists();
  }, [page, category, keyword]);

  function handlePageChange(pageNumber) {
    setPage(pageNumber);
  }

  function handleKeywordChange() {
    const keyword = document.getElementById('keyword').value;
    if (keyword === '') {
      setKeyword(null);
    } else {
      setKeyword(keyword);
    }
  }

  function handleCategoryChange(e) {
    if (e.target.textContent === '전체' || category === e.target.textContent) {
      setCategory(null);
      removeSelectedClass();
    } else {
      removeSelectedClass();
      addSelectedClass(e.target.textContent);
      setCategory(e.target.textContent);
    }
  }

  function removeSelectedClass() {
    const categories1 = document.getElementsByTagName('ul')[1];
    const categories2 = document.getElementsByTagName('ul')[2];
    for (let i = 0; i < categories1.childElementCount; i++) {
      categories1.childNodes[i].classList.remove('category-selected');
    }
    for (let i = 0; i < categories2.childElementCount; i++) {
      categories2.childNodes[i].classList.remove('category-selected');
    }
  }

  function addSelectedClass(targetText) {
    const categories1 = document.getElementsByTagName('ul')[1];
    const categories2 = document.getElementsByTagName('ul')[2];
    for (let i = 0; i < categories1.childElementCount; i++) {
      if (categories1.childNodes[i].textContent === targetText) {
        categories1.childNodes[i].classList.add('category-selected');
        break;
      }
    }
    for (let i = 0; i < categories2.childElementCount; i++) {
      if (categories2.childNodes[i].textContent === targetText) {
        categories2.childNodes[i].classList.add('category-selected');
        break;
      }
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
      <div style={{ textAlign: 'right', width: '90vw', margin: '0 5vw' }}>
        {/** 검색창 */}
        <input
          type="text"
          placeholder="search"
          id="keyword"
        />
        <button onClick={handleKeywordChange}>검색</button>
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
