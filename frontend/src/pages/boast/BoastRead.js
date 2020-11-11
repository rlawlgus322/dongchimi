import React from 'react';
import UserInfoBar from 'components/UserInfoBar';
import styled from 'styled-components';
import SliderableImage from 'components/SliderableImage';
import TextViewer from 'components/TextViewer';
import ArticleInfoIcons from 'components/ArticleInfoIcons';
import CommentWriting from 'components/CommentWriting';

const images = [
  'https://images.unsplash.com/photo-1604724434236-a7cebeaa13e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1601758004584-903c2a9a1abc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1593643946890-b5b85ade6451?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1604582833049-4ddbc5b2ca38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1604521247394-9c294900978b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
];

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

function BoastRead() {
  return (
    <BoastReadBody>
      <InnerBody>
        <Width80Percent>
          <UserInfoBar
            thumbnail="https://avatars0.githubusercontent.com/u/33210021?s=60&v=4"
            id="hideOnBush"
            isMoreButton={true}
          />
        </Width80Percent>
        <SliderableImage images={images} />
        <Width80Percent>
          <TextViewer text={'안녕하세연'} />
          <FlexEnd>
            <ArticleInfoIcons isLike={true} />
          </FlexEnd>
          <HorizontalLine />
          <CommentWriting />
        </Width80Percent>
      </InnerBody>
    </BoastReadBody>
  );
}

export default BoastRead;
