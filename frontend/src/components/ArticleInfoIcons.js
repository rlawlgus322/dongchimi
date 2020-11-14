import React from 'react';
import styled from 'styled-components';
import LikeButtonAndCount from 'components/LikeButtonAndCount';
import ViewConter from 'components/ViewCounter';
import CommentConter from 'components/CommentCounter';

const ArticleInfoIconsBody = styled.div`
  display: flex;
`;

function ArticleInfoIcons(props) {
  const { vcnt, isLike, lcnt } = props;
  return (
    <ArticleInfoIconsBody>
      <ViewConter count={vcnt} />
      <LikeButtonAndCount isLike={isLike} count={lcnt} />
      <CommentConter count={15} />
    </ArticleInfoIconsBody>
  );
}

export default ArticleInfoIcons;
