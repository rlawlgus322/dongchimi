import React from 'react';
import styled from 'styled-components';
import LikeButtonAndCount from 'components/LikeButtonAndCount';
import ViewConter from 'components/ViewCounter';
import CommentConter from 'components/CommentCounter';

const ArticleInfoIconsBody = styled.div`
  display: flex;
`;

function ArticleInfoIcons(props) {
  return (
    <ArticleInfoIconsBody>
      <ViewConter count={10} />
      <LikeButtonAndCount isLike={true} count={50} />
      <CommentConter count={15} />
    </ArticleInfoIconsBody>
  );
}

export default ArticleInfoIcons;
