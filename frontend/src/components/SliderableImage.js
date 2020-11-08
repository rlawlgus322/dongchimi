import React, { useState } from 'react';
import styled from 'styled-components';

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

const MainImage = styled.img`
  width: 80%;
  height: 100%;
  background-color: dodgerblue;
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
  const { images } = props;
  return (
    <SliderableImageBody>
      <ImageSlider>
        <SliderButton
          onClick={() => setIndex(index === 0 ? images.length - 1 : index - 1)}
        >
          Prev
        </SliderButton>
        <MainImage src={images[index]} />
        <SliderButton
          onClick={() => setIndex(index === images.length - 1 ? 0 : index + 1)}
        >
          Next
        </SliderButton>
      </ImageSlider>
      <ImageList>
        {images.map((image) => (
          <SmallImage src={image} />
        ))}
      </ImageList>
    </SliderableImageBody>
  );
}

export default SliderableImage;
