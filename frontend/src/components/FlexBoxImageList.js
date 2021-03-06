import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SexyImageCell from 'components/SexyImageCell';
import { getServerImageUrl } from "utils/common";

const FlexBoxImageListBody = styled.div`
  position: relative;
  display: flex;
  height: 33.33%;
  overflow: hidden;
`
function FlexBoxImageList(props) {
  const [imageAndContent, setImageAndContent] = useState([]);
  const { boastList, size, top, timeInterval } = props;
  const interval = timeInterval || 2000;
  let imageDOMList = [];
  let leftValueList = [];
  let imageIndex = 0;

  const initValues = () => {
    imageDOMList = document.querySelectorAll(`.ImageCell--${top}`);
    for (let i = 0; i < imageDOMList.length; i++) {
      const leftValue = size * i - size;
      leftValueList.push(leftValue);
    }
  }

  const initImageSize = () => {
    for (let i = 0; i < imageDOMList.length; i++) {
      imageDOMList[i].style.width = `${size}px`;
      imageDOMList[i].style.height = `${size}px`;
    }
  }

  const moveImage = () => {
    for (let i = 0; i < imageDOMList.length; i++) {
      const curImageDOM = imageDOMList[(i + imageIndex) % imageDOMList.length];
      curImageDOM.style.zIndex = 100 - i;
      curImageDOM.style.left = `${leftValueList[i]}px`;
    }
    imageIndex++;
  }

  useEffect(() => {
    setImageAndContent(boastList.map((elem) => {
      const { boast: { contents, postImg, bid } } = elem;
      const url = postImg === "{}" ? getServerImageUrl("/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png") : getServerImageUrl(JSON.parse(postImg)[0]);
      return {
        contents,
        url,
        bid
      }
    }));
  }, [boastList])

  useEffect(() => {
    initValues();
    initImageSize();
    moveImage();
    setInterval(moveImage, interval);
  }, [imageAndContent])

  return <FlexBoxImageListBody className={`ImageList--${top}`}>
    {imageAndContent.map((elem, index) => <SexyImageCell className={`ImageCell--${top}`} content={elem.contents} key={index} url={elem.url} bid={elem.bid} />)}
  </FlexBoxImageListBody>
}

export default FlexBoxImageList;