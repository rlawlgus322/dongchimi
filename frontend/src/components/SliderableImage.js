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
  width: 80%;
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

  const ChangeImage = (indexController) => {
    setAniStart(false);
    setTimeout(() => {
      setAniStart(true);
      indexController();
    }, 10);
  };

  const moveToPrevImage = () =>
    setIndex(index === 0 ? images.length - 1 : index - 1);

  const moveToNextImage = () =>
    setIndex(index === images.length - 1 ? 0 : index + 1);

  return (
    <SliderableImageBody>
      <ImageSlider>
        <SliderButton onClick={() => ChangeImage(moveToPrevImage)}>
          Prev
        </SliderButton>
        <MainImage aniStart={aniStart} src={images[index]} />
        <SliderButton onClick={() => ChangeImage(moveToNextImage)}>
          Next
        </SliderButton>
      </ImageSlider>
      <ImageList>
        {images.map((image, index) => (
          <SmallImage
            key={image}
            src={image}
            onClick={() => ChangeImage(() => setIndex(index))}
          />
        ))}
      </ImageList>
    </SliderableImageBody>
  );
}

export default SliderableImage;
