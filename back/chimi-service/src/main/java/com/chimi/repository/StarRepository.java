package com.chimi.repository;

import java.util.List;

import javax.transaction.Transactional;

import com.chimi.model.PKSet;
import com.chimi.model.Star;

import org.springframework.data.repository.CrudRepository;

public interface StarRepository extends CrudRepository<Star, PKSet> {
  List<Star> findByStarPKHid(Long hid);

  @Transactional
  Long deleteByStarPKHid(Long hid);
}
