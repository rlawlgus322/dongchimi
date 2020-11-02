package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.Like;
import com.chimi.model.PKSet;

public interface LikeService {
  Like save(Like Like);
  void deleteById(PKSet pk);
  Optional<Like> findById(PKSet pk);
  List<Like> findByLikePKId(Long cid);     // 댓글을 좋아하는 목록 찾기
  Long deleteByLikePKId(Long cid);        // 댓글 좋아요 목록 삭제
}
