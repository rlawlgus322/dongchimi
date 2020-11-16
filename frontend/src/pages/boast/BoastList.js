import React, { useEffect, useState } from 'react';
import Boasts from '../../components/Boast/List/Boasts';
import api from 'utils/api';
import Pagination from 'react-js-pagination';

function BoastList({ history }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(1); // 전체 데이터 개수

  useEffect(() => {
    getBoastList();
  }, [page]);

  function getBoastList() {
    api.get('/boast/all', {
      params: {
        page: page - 1,
        size: 12,
      },
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      // console.log('boast list', data);
      setData(data);
    }).catch((err) => {
      console.log(err);
    })
  }

  function handlePageChange(pageNumber) {
    // console.log('active page ', pageNumber);
    setPage(pageNumber);
  }

  return (
    <>
      
      <div style={{ textAlign: "right" }}>
        {
          sessionStorage.getItem('token') !== null &&
          <button
            onClick={() => history.push('/boast/write')}
          >글쓰기</button>
        }
      </div>
      <Boasts boasts={data}></Boasts>
      <div style={{ textAlign: "center" }}>
        <Pagination
          activePage={page}
          itemsCountPerPage={12}
          totalItemsCount={50}
          pageRangeDisplayed={5}
          itemClass="page-item"
          linkClass="page-link"
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default BoastList;

