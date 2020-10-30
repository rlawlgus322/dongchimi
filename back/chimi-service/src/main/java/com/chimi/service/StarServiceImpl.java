package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.PKSet;
import com.chimi.model.Star;
import com.chimi.repository.StarRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StarServiceImpl implements StarService {

  @Autowired
  StarRepository starRepository;

  @Override
  public Star save(Star star) {
    return starRepository.save(star);
  }

  @Override
  public void deleteById(PKSet pk) {
      starRepository.deleteById(pk);
  }

  @Override
  public Optional<Star> findById(PKSet pk) {
    return starRepository.findById(pk);
  }

  @Override
  public List<Star> findByStarPKHid(Long hid) {
    return starRepository.findByStarPKHid(hid);
  }

  @Override
  public Long deleteByStarPKHid(Long hid) {
    return starRepository.deleteByStarPKHid(hid);
  }
  
}
