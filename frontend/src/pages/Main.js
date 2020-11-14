import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import MovingImageList from 'components/MovingImageList';
import api from "utils/api";
const MainBody = styled.div`
  width: 100%;
`
function Main() {
  const [boastList, setBoastList] = useState([]);

  useEffect(async () => {
    try{
      const {data} = await api.get("boast/all",  {
        params: {
          size: 24
        },
        headers: {
          accessToken: sessionStorage.getItem("token")
        }
      })
      setBoastList(data);
    }catch(error){
      console.error(error);
    }
  }, [])

  //const logged = sessionStorage.getItem('token') === null;

  return (
    <MainBody>
      <MovingImageList boastList={boastList}/>
    </MainBody>
  )
}

export default Main;

