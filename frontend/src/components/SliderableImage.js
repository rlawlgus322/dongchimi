import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const SliderableImageBody = styled.div`
  width: 800px;
  height: 600px;
  background-color: gold;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageSlider = styled.div`
  background-color: pink;
  width: 100%;
  height: 80%;
`;

const boxFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const MainImage = styled.img`
  width: 80%;
  height: 100%;
  background-color: dodgerblue;
  animation: ${(props) => (props.aniStart ? boxFade : '')} 0.7s ease;
`;

const SliderButton = styled.button`
  width: 10%;
  height: 50px;
  background-color: gray;
  border: none;
  &:focus {
    outline: none;
  }
`;

const ImageList = styled.div`
  width: 100%;
  height: 20%;
  background-color: skyblue;
`;

const SmallImage = styled.img`
  width: 20%;
  height: 100%;
  background-color: aliceblue;
`;

function SliderableImage(props) {
  const [index, setIndex] = useState(0);
  const [aniStart, setAniStart] = useState(false);
  const { images } = props;
  return (
    <SliderableImageBody>
      <ImageSlider>
        <SliderButton
          onClick={() => {
            // 나중에 중복 제거
            setIndex(index === 0 ? images.length - 1 : index - 1);
            setAniStart(true);
            setTimeout(() => setAniStart(false), 500);
          }}
        >
          Prev
        </SliderButton>
        <MainImage aniStart={aniStart} src={images[index]} />
        <SliderButton
          onClick={() => {
            // 나중에 중복 제거
            setIndex(index === images.length - 1 ? 0 : index + 1);
            setAniStart(true);
            setTimeout(() => setAniStart(false), 500);
          }}
        >
          Next
        </SliderButton>
      </ImageSlider>
      <ImageList>
        {images.map((image) => (
          <SmallImage key={image} src={image} />
        ))}
      </ImageList>
    </SliderableImageBody>
  );
}

export default SliderableImage;
