import Axios from 'axios';
import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  &:hover {
    opacity: 0.8;
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
  padding: 0;
`;

const ImageList = styled.div`
  display: flex;
  justify-content:space-between;
  width: 100%;
  height: auto;
  flex-grow: 1;
`

const Image = styled.img`
  width: 19%;
  height: 100%;
`

function  ImageUploader() {
  const [imageList, setImageList] = useState([undefined,undefined,undefined,undefined,undefined])
  const onChnagehandler = async  (event) => {
    const preview = document.getElementById('preview');
    const files = event.target.files;
    
    console.log(files);
    
    preview.style.backgroundImage = files.length ? `url(${URL.createObjectURL(files[0])})` : "";
    
    // 지금 안 되는 듯
    // const formData = new FormData();
    // formData.append("file", files[0]);

    // try{
    //   const res = await axios.post(
    //     'https://k3a409.p.ssafy.io/api/boast/image',
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data"
    //       }
    //     }
    //   )
    //   console.log(res);
    // } catch(error){
    //   console.dir(error);
    // }

    // 파일 여러개 업로드하면 imageList에 저장
    let arrayList = [];
    for(let i=0;i<files.length;i++){
      arrayList.push(URL.createObjectURL(files[i]));
    }
    setImageList(arrayList);
  };

// http://k3a409.p.ssafy.io/api/boast/image


  return (
    <ImageUploaderBody>
      <Label for="inputFile" id="preview">이미지 업로드</Label>
      <Input
        type="file"
        accept=".jpg,.png,.gif,.jpeg"
        multiple
        id="inputFile"
        onChange={(event) => onChnagehandler(event)}
      />
      <ImageList>
        {imageList.map((elem, index) => elem && <Image key={index} src={elem}/>)}
      </ImageList>
    </ImageUploaderBody>
  );
}

export default ImageUploader;
