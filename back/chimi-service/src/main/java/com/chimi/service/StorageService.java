package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.PKSet;
import com.chimi.model.Storage;

public interface StorageService {
  Storage save(Storage storage);      
  Optional<Storage> findById(PKSet pk);
  List<Storage> findByStoragePKUserId(long id);  // 사용자의 보관함 조회
  void deleteById(PKSet pk);					//  보관함 삭제
}
