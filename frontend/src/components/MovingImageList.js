import React, {useEffect} from 'react';
import styled from 'styled-components';
import FlexBoxImageList from 'components/FlexBoxImageList';

const imageList = [
"https://k3a409.p.ssafy.io/file/0aedb9af-7a51-441b-9449-16461035ad9c.jpeg",
"https://images.unsplash.com/photo-1602526428496-8346b5cf9954?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1605131545304-096aeaeee5d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1605217431875-d1b97092115d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1603920244381-1a9f6d7914c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1601758124331-9410bf99002f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1605224307451-c86d7093f375?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1605246811037-7a815fa646e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1605213531647-fb211426f519?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1605213304982-3729ab855027?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
];

const imageList2 = [
  "https://images.unsplash.com/photo-1605050825221-66a810cb6d36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
  "https://images.unsplash.com/photo-1605020614743-65096a9ac90c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
  "https://images.unsplash.com/photo-1605090378975-85885877d84e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
  "https://images.unsplash.com/photo-1605256801693-882832f5d2de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
  "https://images.unsplash.com/photo-1605131546231-a5f385db4a6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
  "https://images.unsplash.com/photo-1605030753481-bb38b08c384a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
  "https://images.unsplash.com/photo-1605245871292-ea12ecbac076?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
]

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