import React from 'react';
import styled from 'styled-components';

const CommentWritingBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 200px;
`;

const TextBox = styled.div`
  width: 100%;
  height: 5rem;
  border: 1px solid black;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
`;

function CommentWriting() {
  return (
    <CommentWritingBody>
      <TextBox contentEditable="true"></TextBox>
      <SubmitButton>입력하기</SubmitButton>
    </CommentWritingBody>
  );
}

export default CommentWriting;
