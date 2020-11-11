import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const LikeCount = styled.span``;

function LikeButtonAndCount(props) {
  const { isLike, count } = props;
  return (
    <LikeButtonAndCountBody>
      <LikeButton>
        {isLike ? (
          <FontAwesomeIcon icon={['fas', 'heart']} size="lg" color="crimson" />
        ) : (
          <FontAwesomeIcon icon={['far', 'heart']} size="lg" />
        )}
      </LikeButton>
      <LikeCount>{count}</LikeCount>
      <LikeCount />
    </LikeButtonAndCountBody>
  );
}

export default LikeButtonAndCount;
