package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.PKSet;
import com.chimi.model.ChimiStar;

public interface StarService {
  ChimiStar save(ChimiStar star);
  void deleteById(PKSet pk);
  Optional<ChimiStar> findById(PKSet pk);
  List<ChimiStar> findByStarPKId(long hid);     // 취미파티를 추천 목록 찾기
  long deleteByStarPKId(long hid);        // 취미파티의 추천 목록 삭제
}
