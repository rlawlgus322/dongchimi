import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from 'utils/api';
import { toast } from 'react-toastify';

const LikeButtonAndCountBody = styled.span`
  display: flex;
  margin: 0px 10px;
`;

const LikeButton = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  padding: 0px;
  margin-right: 5px;
  &:focus {
    outline: none;
  }
`;

const LikeCount = styled.span`
 color: #7dbb77; 
`;

function LikeButtonAndCount(props) {
  const { isLike, bid, count, getBoastRead } = props;
  return (
    <LikeButtonAndCountBody>
      <LikeButton
        onClick={() => {
          if (!isLike) {
            api.put(`/boast/like/${bid}`, {}, {
              headers: {
                accessToken: sessionStorage.getItem('token'),
              }
            }).then(({ data }) => {
              // console.log('like success', data);
              toast.success("💖 게시물 좋아요 성공", {
                position: "bottom-right",
                autoClose: 3000,
              })
              getBoastRead();
            }).catch((err) => {
              console.log(err)
              toast.error("😢 게시물 좋아요 실패", {
                position: "bottom-right",
                autoClose: 3000,
              })
            })
          } else {
            api.put(`/boast/dislike/${bid}`, {}, {
              headers: {
                accessToken: sessionStorage.getItem('token'),
              }
            }).then(({ data }) => {
              // console.log('dislike success', data);
              toast.success("💔 게시물 좋아요 취소 성공", {
                position: "bottom-right",
                autoClose: 3000,
              })
              getBoastRead();
            }).catch((err) => {
              console.log(err);
              toast.error("😢 게시물 좋아요 취소 실패", {
                position: "bottom-right",
                autoClose: 3000,
              })
            })
          }
        }}
      >
        {isLike ? (
          <FontAwesomeIcon icon={['fas', 'heart']} size="lg" color="crimson" />
        ) : (
            <FontAwesomeIcon icon={['far', 'heart']} size="lg" color="#7dbb77" />
          )}
      </LikeButton>
      <LikeCount>{count}</LikeCount>
      <LikeCount />
    </LikeButtonAndCountBody>
  );
}

export default LikeButtonAndCount;
