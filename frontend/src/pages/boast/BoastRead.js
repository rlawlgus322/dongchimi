import React, { useEffect, useState } from 'react';
import UserInfoBar from 'components/UserInfoBar';
import styled from 'styled-components';
import SliderableImage from 'components/SliderableImage';
import TextViewer from 'components/TextViewer';
import ArticleInfoIcons from 'components/ArticleInfoIcons';
import CommentWriting from 'components/CommentWriting';
import CommentRead from 'components/CommentRead';
import api from 'utils/api';

const BoastReadBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InnerBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: teal;
  width: 800px;
`;

const FlexEnd = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const HorizontalLine = styled.div`
  border-bottom: 2px solid #d0e7ce;
  width: 100%;
  height: 10px;
`;

const Width80Percent = styled.div`
  width: 80%;
`;

function BoastRead(props) {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [boast, setBoast] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getBoastRead();
    getBoastComment();
  }, [])

  function getBoastRead() {
    api.get(`/boast/${props.match.params.id}`, {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      // console.log('boast read', data);
      setData(data);
      const img = JSON.parse(data.boast.postImg);
      const tmp = [];
      for (let i = 0; i < Object.keys(img).length; i++) {
        const path = "https://k3a409.p.ssafy.io" + img[i];
        tmp.push(path);
      }
      setBoast(data.boast);
      setImages(tmp);
      if (data.profileImage === "null") {
        setProfileImage("https://k3a409.p.ssafy.io/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png")
      } else {
        setProfileImage("https://k3a409.p.ssafy.io" + data.profileImage);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  function getBoastComment() {
    api.get(`/boast/comment/all/${props.match.params.id}`, {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      console.log('comments', data);
      setComments(data);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <BoastReadBody>
      <InnerBody>
        <Width80Percent>
          <UserInfoBar
            thumbnail={profileImage}
            id={data.nicknname}
            isMoreButton={true}
          />
        </Width80Percent>
        <SliderableImage images={images} />
        <Width80Percent>
          <TextViewer text={boast.contents} />
          <FlexEnd>
            <ArticleInfoIcons boast={boast} isLike={data.liked} getBoastRead={getBoastRead} />
          </FlexEnd>
          <HorizontalLine />
          <CommentWriting bid={boast.bid} />
          <CommentRead />
        </Width80Percent>
      </InnerBody>
    </BoastReadBody>
  );
}

export default BoastRead;
