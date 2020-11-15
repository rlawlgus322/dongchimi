import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentCounterBody = styled.div`
  display: flex;
  margin: 0px 5px;
`;

const CommentIcon = styled.span`
  margin-right: 5px;
`;

function CommentCounter(props) {
  const { count } = props;

  return (
    <CommentCounterBody>
      <CommentIcon>
        <FontAwesomeIcon icon={['fas', 'comment-dots']} size="lg" />
      </CommentIcon>
      {count}
    </CommentCounterBody>
  );
}

export default CommentCounter;
