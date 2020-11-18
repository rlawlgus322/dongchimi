import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import UserInfoBar from 'components/UserInfoBar';
import LikeButtonAndCount from 'components/LikeButtonAndCount';

const CommentReadBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
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

const Date = styled.p`
  color: #7dbb77;
`;

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
  const comment = props;
  const [isAddReplyShow, setIsAddReplyShow] = useState(false);
  const toggleReplyTextArea = () => {
    console.log('c');
    console.log(props);
    setIsAddReplyShow(!isAddReplyShow);
  };

  function getFormatDate(date) {
    return moment(date).tz('Asia/Seoul').format('YYYY-MM-DD hh:mm');
  }

  return (
    <CommentReadBody>
      <UserInfoBar
        thumbnail={comment.comment.profileImage === "null" ?
          "https://k3a409.p.ssafy.io/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png" :
          "https://k3a409.p.ssafy.io" + comment.comment.profileImage}
        id={comment.comment.nickname}
        isMoreButton={false}
      />
      <CommentText>{comment.comment.comment.content}</CommentText>
      <CommentReadFooter>
        <Date>{getFormatDate(comment.comment.comment.createdate)}</Date>
        <LikeButtonAndCount count={comment.comment.comment.likes} />
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
