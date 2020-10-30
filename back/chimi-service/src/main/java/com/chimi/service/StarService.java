package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.PKSet;
import com.chimi.model.Star;

public interface StarService {
  Star save(Star star);
  void deleteById(PKSet pk);
  Optional<Star> findById(PKSet pk);
  List<Star> findByStarPKHid(Long hid);     // 취미파티를 추천 목록 찾기
  Long deleteByStarPKHid(Long hid);        // 취미파티의 추천 목록 삭제
}
