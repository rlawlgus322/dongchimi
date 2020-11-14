import React, {useEffect} from 'react';
import styled from 'styled-components';

const LeftValueList = ["-300px", "0px", "300px", "600px", "900px", "1200px", "1500px", "1800px", "2100px", "2400px"];

const FlexBoxImageListBody = styled.div`
  position: relative;
  display: flex;
  height: 33.33%;
  overflow: hidden;
`

const ImageCell = styled.img`
  position: absolute;
  width: 300px;
  height: 300px;
  transition: left 0.5s ease-in-out;
`



function FlexBoxImageList(props) {
  const {imageUrlList, size, top, timeInterval} = props;
  const interval = timeInterval || 2000;


  let imageDOMList = [];
  let leftValueList = [];
  let imageIndex = 0;
  
  const initImageSize = (size, top) => {
    document.querySelector(`.ImageList--${top}`);
    for(let i=0;i<imageDOMList.length;i++){
      imageDOMList[i].style.width = `${size}px`;
      imageDOMList[i].style.height = `${size}px`;
    }
  }
  const initValues = () => {
    imageDOMList = document.querySelectorAll(`.ImageCell--${top}`);
    for(let i=0;i<imageDOMList.length;i++){
      const leftValue = size*i - size;
      leftValueList.push(leftValue);
    }
  }

  useEffect(() => {
    initValues(size, top);
    initImageSize(size, top);
    moveImage();
    setInterval(moveImage, interval);
  }, [])

  const moveImage = () => {
    for(let i=0;i<imageDOMList.length;i++){
      const curImageDOM = imageDOMList[(i+imageIndex)%imageDOMList.length];
      curImageDOM.style.zIndex = -i;
      curImageDOM.style.left = `${leftValueList[i]}px`;
    }
    imageIndex++;
  }

  return <FlexBoxImageListBody className={`ImageList--${top}`}>
    {imageUrlList.map((url, index) => <ImageCell className={`ImageCell--${top}`} key={index} src={url}/>)}
  </FlexBoxImageListBody>
}

export default FlexBoxImageList;