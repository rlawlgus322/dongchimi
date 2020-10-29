package com.chimi.service;

import java.util.Optional;

import com.chimi.model.PKSet;
import com.chimi.model.Star;

public interface StarService {
  Star save(Star star);
  void deleteById(PKSet pk);
  Optional<Star> findById(PKSet pk);
}
