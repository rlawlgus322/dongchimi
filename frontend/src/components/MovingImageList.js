import React from 'react';
import styled from 'styled-components';
import FlexBoxImageList from 'components/FlexBoxImageList';

const MovingImageListBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 900px;
`

function MovingImageList(props) {
  const {boastList} = props;
  const row = 3;
  const col = parseInt(boastList.length / row);

  const boastList2D = [];

  for(let i=0;i<row;i++){
    const tempList = [];
    for(let j=0;j<col;j++){
      tempList.push(boastList[i*col + j]);
    }
    boastList2D.push(tempList);
  }

  return (
  <MovingImageListBody>
    <FlexBoxImageList boastList={boastList2D[0]} size="300" top="0" timeInterval="2100"/>
    <FlexBoxImageList boastList={boastList2D[1]} size="300" top="300" timeInterval="2300"/>
    <FlexBoxImageList boastList={boastList2D[2]} size="300" top="600" timeInterval="2200"/>
  </MovingImageListBody>
  )  
}

export default MovingImageList;