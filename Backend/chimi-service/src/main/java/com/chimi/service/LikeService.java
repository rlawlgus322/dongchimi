package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.CommentLike;
import com.chimi.model.PKSet;

public interface LikeService {
  CommentLike save(CommentLike Like);
  void deleteById(PKSet pk);
  Optional<CommentLike> findById(PKSet pk);
  List<CommentLike> findByLikePKId(long cid);     // 댓글을 좋아하는 목록 찾기
  void deleteByLikePKId(long cid);        // 댓글 좋아요 목록 삭제
}
