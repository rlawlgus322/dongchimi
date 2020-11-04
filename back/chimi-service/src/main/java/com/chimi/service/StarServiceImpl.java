package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.PKSet;
import com.chimi.model.ChimiStar;
import com.chimi.repository.StarRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StarServiceImpl implements StarService {

  @Autowired
  StarRepository starRepository;

  @Override
  public ChimiStar save(ChimiStar star) {
    return starRepository.save(star);
  }

  @Override
  public void deleteById(PKSet pk) {
      starRepository.deleteById(pk);
  }

  @Override
  public Optional<ChimiStar> findById(PKSet pk) {
    return starRepository.findById(pk);
  }

  @Override
  public List<ChimiStar> findByStarPKId(Long hid) {
    return starRepository.findByStarPK_ChimiId(hid);
  }

  @Override
  public Long deleteByStarPKId(Long hid) {
    return starRepository.deleteByStarPK_ChimiId(hid);
  }
  
}
