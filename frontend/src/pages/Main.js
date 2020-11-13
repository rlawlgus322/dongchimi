import React from 'react';
import styled from 'styled-components';
import MovingImageList from 'components/MovingImageList';
const MainBody = styled.div`
  width: 100%;
`
function Main() {
  
  const logged = sessionStorage.getItem('token') === null;

  return (
    <MainBody>
      <MovingImageList />
    </MainBody>
  )
}

export default Main;

