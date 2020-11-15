import React, { useState } from 'react';
import styled from 'styled-components';
import api from 'utils/api';

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
  margin-top: 20px;
  align-self: flex-end;
`;

function CommentWriting(props) {
  const { bid } = props;
  return (
    <CommentWritingBody>
      <TextBox contentEditable="true" id="textBox" />
      <SubmitButton
        onClick={() => {
          if (sessionStorage.getItem('token') === null) {
            alert("로그인이 필요합니다");
            return;
          }
          api.post('/boast/comment', {
            bid: bid,
            content: document.getElementById('textBox').innerText,
          }, {
            headers: {
              accessToken: sessionStorage.getItem('token')
            }
          }).then(({ data }) => {
            // console.log('succes comment write');
            // console.log(data);
            document.getElementById('textBox').innerText = '';
          }).catch((err) => {
            console.log(err);
          })
        }}
      >입력하기</SubmitButton>
    </CommentWritingBody>
  );
}

export default CommentWriting;
