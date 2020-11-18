import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MovingImageList from 'components/MovingImageList';
import api from "utils/api";
import IndexBottom from 'components/indexBottom';
const MainBody = styled.div`
  width: 100%;
`

function Main() {
  const [boastList, setBoastList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get("boast/all", {
          params: {
            size: 30
          },
          headers: {
            accessToken: sessionStorage.getItem("token")
          }
        })
        setBoastList(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [])


  return (
    <MainBody>
      <MovingImageList boastList={boastList} />
      <IndexBottom></IndexBottom>
    </MainBody>
  )
}

export default Main;

