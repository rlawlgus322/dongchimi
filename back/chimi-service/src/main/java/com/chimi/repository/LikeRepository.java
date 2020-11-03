package com.chimi.repository;

import java.util.List;

import javax.transaction.Transactional;

import com.chimi.model.Like;
import com.chimi.model.PKSet;

import org.springframework.data.repository.CrudRepository;

public interface LikeRepository extends CrudRepository<Like, PKSet> {
  List<Like> findByLikePKId(Long hid);

  @Transactional
  Long deleteByLikePKId(Long hid);
}
