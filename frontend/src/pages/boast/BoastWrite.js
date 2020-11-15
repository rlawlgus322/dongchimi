import React from 'react';
import styled from 'styled-components';
import ImageUploader from 'components/ImageUploader';
import multipart from 'utils/multipart';
import HobbyCategory from "components/HobbyCategory";
import api from "utils/api";

const BoastWriteBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 90vh;
  padding-top: 20px;
  box-sizing:border-box;
`;

const BoastContent = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid black;
`;

const SubmitButton = styled.button`
  
`;

function BoastWrite() {
  let imageFiles = {};
  let category = "";
  let imageUrls = [];
  const submitBoast = async () => {
    await uploadImages(); 
    const title = "title";
    const postImg = JSON.stringify(imageUrls);
    const contents = document.getElementById("BoastContent").innerText;
    const payload = {
      category,
      title,
      postImg,
      contents,
    }

    try{
      api.post("boast/", payload, {
        headers: {
          accessToken: sessionStorage.getItem("token")
        }
      })
    }catch(error){
      console.error(error);
    }
  }

  const setImageFiles = (files) => {
    imageFiles = files;
  }

  const setCategory = (_category) => {
    category = _category;
  }

  const uploadImages = async () => {
    if(!imageFiles){
      return;
    }

    imageUrls = [];

    for(let i=0;i<imageFiles.length;i++){
      const formData = new FormData();
      formData.append("file", imageFiles[i]);
      
      try{
        const {data} = await multipart.post('boast/image', formData);
        imageUrls.push(data);
      }catch(error){
        console.error(error);
      }
    }
    imageUrls = {...imageUrls};
  }

  return (
  <BoastWriteBody>
    <ImageUploader setImageFiles={setImageFiles}/>
    <HobbyCategory setCategory={setCategory}/>
    <BoastContent contentEditable={true} id="BoastContent"></BoastContent>
    <SubmitButton onClick={submitBoast}>업로드</SubmitButton>
  </BoastWriteBody>
  )
}

export default BoastWrite;

