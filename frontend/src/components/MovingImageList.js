import React, {useEffect} from 'react';
import styled from 'styled-components';
import FlexBoxImageList from 'components/FlexBoxImageList';
// 한 줄당 이미지 10개 이하로 

const LeftValueList = ["-300px", "0px", "300px", "600px", "900px", "1200px", "1500px", "1800px", "2100px", "2400px"];

const imageList = [
"https://images.unsplash.com/photo-1605021170978-35f9508451b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
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

function MovingImageList() {

  return (
  <MovingImageListBody>
    <FlexBoxImageList imageUrlList={imageList} size="300" top="0" timeInterval="2100"/>
    <FlexBoxImageList imageUrlList={imageList2} size="300" top="300" timeInterval="2300"/>
    <FlexBoxImageList imageUrlList={imageList} size="300" top="600" timeInterval="2200"/>
  </MovingImageListBody>
  )  
}

export default MovingImageList;