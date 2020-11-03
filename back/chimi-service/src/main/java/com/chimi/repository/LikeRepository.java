package com.chimi.repository;

import java.util.List;

import javax.transaction.Transactional;

import com.chimi.model.CommentLike;
import com.chimi.model.PKSet;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface LikeRepository extends CrudRepository<CommentLike, PKSet> {
  List<CommentLike> findByLikePKId(Long hid);

  @Transactional
  Long deleteByLikePKId(Long hid);
}
