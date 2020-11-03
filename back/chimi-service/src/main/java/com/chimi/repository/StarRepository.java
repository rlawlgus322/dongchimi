package com.chimi.repository;

import java.util.List;

import javax.transaction.Transactional;

import com.chimi.model.PKSet;
import com.chimi.model.ChimiStar;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface StarRepository extends CrudRepository<ChimiStar, PKSet> {
  List<ChimiStar> findByStarPKId(Long cid);

  @Transactional
  Long deleteByStarPKId(Long cid);
}
