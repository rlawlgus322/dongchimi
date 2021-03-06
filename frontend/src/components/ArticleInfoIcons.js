import React from 'react';
import styled from 'styled-components';
import LikeButtonAndCount from 'components/LikeButtonAndCount';
import ViewConter from 'components/ViewCounter';
import CommentConter from 'components/CommentCounter';

const ArticleInfoIconsBody = styled.div`
  display: flex;
  color: #7dbb77;
`;

function ArticleInfoIcons(props) {
  const { boast, isLike, getBoastRead } = props;
  return (
    <ArticleInfoIconsBody>
      <ViewConter count={boast.views} />
      <LikeButtonAndCount isLike={isLike} bid={boast.bid} count={boast.likes} getBoastRead={getBoastRead} />
      <CommentConter count={15} />
    </ArticleInfoIconsBody>
  );
}

export default ArticleInfoIcons;
