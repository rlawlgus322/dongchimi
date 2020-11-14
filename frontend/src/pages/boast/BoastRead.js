import React, { useEffect, useState } from 'react';
import UserInfoBar from 'components/UserInfoBar';
import styled from 'styled-components';
import SliderableImage from 'components/SliderableImage';
import TextViewer from 'components/TextViewer';
import ArticleInfoIcons from 'components/ArticleInfoIcons';
import CommentWriting from 'components/CommentWriting';
import CommentRead from 'components/CommentRead';
import api from 'utils/api';

// const images = [
//   'https://images.unsplash.com/photo-1604724434236-a7cebeaa13e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
//   'https://images.unsplash.com/photo-1601758004584-903c2a9a1abc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
//   'https://images.unsplash.com/photo-1593643946890-b5b85ade6451?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
//   'https://images.unsplash.com/photo-1604582833049-4ddbc5b2ca38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
//   'https://images.unsplash.com/photo-1604521247394-9c294900978b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
// ];

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
  background-color: teal;
  width: 800px;
`;

const FlexEnd = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const HorizontalLine = styled.div`
  border-bottom: 2px solid blueviolet;
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

  useEffect(() => {
    api.get(`/boast/${props.match.params.id}`, {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      console.log('boast read', data);
      setData(data);
      const img = JSON.parse(data.boast.postImg);
      const tmp = [];
      for (let i = 0; i < Object.keys(img).length; i++) {
        const path = "http://k3a409.p.ssafy.io" + img[i];
        tmp.push(path);
      }
      setBoast(data.boast);
      setImages(tmp);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <BoastReadBody>
      <InnerBody>
        <Width80Percent>
          <UserInfoBar
            thumbnail={`https://k3a409.p.ssafy.io${data.profileImage}`}
            id={data.nicknname}
            isMoreButton={true}
          />
        </Width80Percent>
        <SliderableImage images={images} />
        <Width80Percent>
          <TextViewer text={boast.contents} />
          <FlexEnd>
            <ArticleInfoIcons vcnt={boast.views} isLike={data.liked} lcnt={boast.likes} />
          </FlexEnd>
          <HorizontalLine />
          <CommentWriting />
          <CommentRead />
        </Width80Percent>
      </InnerBody>
    </BoastReadBody>
  );
}

export default BoastRead;
