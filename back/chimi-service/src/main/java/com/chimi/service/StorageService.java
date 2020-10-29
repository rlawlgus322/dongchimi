package com.chimi.service;

import java.util.Optional;

import com.chimi.model.PKSet;
import com.chimi.model.Storage;

public interface StorageService {
  Storage save(Storage storage);      
  Optional<Storage> findById(PKSet pk);
  void deleteById(PKSet pk);					//  보관함 삭제
}
