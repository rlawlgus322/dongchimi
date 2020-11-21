import React, { useState } from 'react';
import styled from 'styled-components';

const ImageUploaderBody = styled.div`
  width: 600px;
  height: 500px;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.2);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 0.5;
  }
`;

const Input = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: none;
  clip: rect(0, 0, 0, 0);
  margin: --1px;
`;

const ImageList = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-grow: 1;
`

const Image = styled.img`
  width: 19%;
  height: 76px;
  & + &{
    margin-left: 7px;
  }
`

function ImageUploader(props) {
  const [imageList, setImageList] = useState([]);
  const { setImageFiles } = props;

  let files = {};

  const paintImages = () => {
    if (!files) {
      return;
    }

    let arrayList = [];
    for (let i = 0; i < files.length; i++) {
      arrayList.push(URL.createObjectURL(files[i]));
    }

    setImageList(arrayList);
  }

  const onChnagehandler = (event) => {
    const preview = document.getElementById('preview');
    files = event.target.files;
    if (files.length > 5) {
      alert("최대 5개의 이미지만 올릴 수 있습니다.")
      return;
    }
    preview.style.backgroundImage = files.length ? `url(${URL.createObjectURL(files[0])})` : "";

    paintImages();
    setImageFiles(files);
  };

  return (
    <ImageUploaderBody>
      <Label htmlFor="inputFile" id="preview">이미지 업로드 (최대 5개)</Label>
      <Input
        type="file"
        accept=".jpg,.png,.gif,.jpeg"
        multiple
        id="inputFile"
        onChange={(event) => onChnagehandler(event)}
      />
      <ImageList>
        {imageList.map((elem, index) => elem && <Image key={index} src={elem} />)}
      </ImageList>
    </ImageUploaderBody>
  );
}

export default ImageUploader;
