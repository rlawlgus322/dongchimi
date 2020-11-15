import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfoBar from 'components/UserInfoBar';
import LikeButtonAndCount from 'components/LikeButtonAndCount';

const CommentReadBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CommentText = styled.div`
  width: 100%;
  height: 3em;
  margin-top: 20px;
`;

const CommentReadFooter = styled.div`
  display: flex;
  width: 100%;
`;

const Date = styled.span``;
const AddReplyButton = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  padding: 0px;
  margin-right: 5px;
  color: dodgerblue;
  &:focus {
    outline: none;
  }
`;

const ReplyTextArea = styled.div`
  width: ${(props) => (props.isAddReplyShow ? '100%' : '10%')};
  height: ${(props) => (props.isAddReplyShow ? '1.2em' : '0px')};
  border-bottom: ${(props) => (props.isAddReplyShow ? '2px' : '0px')} solid red;
  transition: all 0.2s ease-in-out;
`;

function CommentRead(props) {
  const [isAddReplyShow, setIsAddReplyShow] = useState(false);
  const toggleReplyTextArea = () => {
    console.log('c');
    setIsAddReplyShow(!isAddReplyShow);
  };

  return (
    <CommentReadBody>
      {/* <UserInfoBar
        thumbnail="https://avatars0.githubusercontent.com/u/33210021?s=60&v=4"
        id="hideOnBush"
        isMoreButton={false}
      /> */}
      <CommentText>댓글</CommentText>
      <CommentReadFooter>
        <Date>2020-10-04</Date>
        <LikeButtonAndCount count={24} />
        <AddReplyButton onClick={toggleReplyTextArea}>답글 달기</AddReplyButton>
      </CommentReadFooter>
      <ReplyTextArea
        isAddReplyShow={isAddReplyShow}
        contentEditable="true"
      ></ReplyTextArea>
    </CommentReadBody>
  );
}

export default CommentRead;
