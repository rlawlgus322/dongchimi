import React, {useEffect} from 'react';
import styled from 'styled-components';

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

const MovingImageListBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 750px;
`
const FlexBoxImageList = styled.div`
  position: relative;
  display: flex;
  height: 33.33%;
  overflow: hidden;
`

const ImageCell = styled.img`
  position: absolute;
  height: 300px;
  width: 300px;
  transition: left 0.5s ease-in-out;
`
let imageIndex = 0;
let imageDOMLists = [];
const ImageDataLength = 10;
function MovingImageList() {

  const MoveImage = () => {
    const bottleNeck = Math.min(LeftValueList.length, ImageDataLength);
    for(let i=0;i<bottleNeck;i++){
      const curImageDOM = imageDOMLists[(i+imageIndex)%bottleNeck]
      curImageDOM.style.zIndex = -i;
      curImageDOM.style.left = LeftValueList[i];
    }
    imageIndex++
  }

  useEffect(() => {
    imageDOMLists = document.querySelectorAll(".ImageCell");
    MoveImage();
    setInterval(MoveImage, 2000);
  }, []);

  return (
  <MovingImageListBody>
    <FlexBoxImageList>
      {imageList.map((elem, index) => <ImageCell className="ImageCell" key={index} src={elem}/>)}
    </FlexBoxImageList>
  </MovingImageListBody>
  )  
}

export default MovingImageList;