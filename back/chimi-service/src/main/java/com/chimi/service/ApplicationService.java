package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.Application;
import com.chimi.model.PKSet;

public interface ApplicationService {
  Application save(Application storage);      
  Optional<Application> findById(PKSet pk);
  List<Application> findByApplicationPKEmail(String email);  // 사용자의 보관함 조회
  void deleteById(PKSet pk);					//  보관함 삭제
}
