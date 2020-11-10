import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ArticleInfoIconsBody = styled.div`
  display: flex;
`;

const LikeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  &:focus {
    outline: none;
  }
`;

const Counter = styled.span`
  margin-left: 5px;
  margin-right: 10px;
`;

function ArticleInfoIcons(props) {
  const [isLike, setIsLike] = useState(props.isLike);

  const ClickLikeButton = () => {
    setIsLike(!isLike);
    // Todo: React Redux 쓰는거로 구조 싹 바꾸기
  };

  return (
    <ArticleInfoIconsBody>
      <FontAwesomeIcon icon={['far', 'eye']} size="lg" />
      <Counter>10</Counter>
      <LikeButton onClick={ClickLikeButton}>
        {isLike ? (
          <FontAwesomeIcon icon={['fas', 'heart']} size="lg" color="crimson" />
        ) : (
          <FontAwesomeIcon icon={['far', 'heart']} size="lg" />
        )}
      </LikeButton>
      <Counter>10</Counter>
      <FontAwesomeIcon icon={['fas', 'comment-dots']} size="lg" />
      <Counter>10</Counter>
    </ArticleInfoIconsBody>
  );
}

export default ArticleInfoIcons;
