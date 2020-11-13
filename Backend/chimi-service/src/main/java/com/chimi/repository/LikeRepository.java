package com.chimi.repository;

import java.util.List;

import javax.transaction.Transactional;

import com.chimi.model.CommentLike;
import com.chimi.model.PKSet;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface LikeRepository extends CrudRepository<CommentLike, PKSet> {
  List<CommentLike> findAllByLikePKChimiId(long hid);
  @Modifying
  @Transactional
  Long deleteByLikePK_ChimiId(long hid);
}
