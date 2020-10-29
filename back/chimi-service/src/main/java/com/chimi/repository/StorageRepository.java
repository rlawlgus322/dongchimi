package com.chimi.repository;

import com.chimi.model.PKSet;
import com.chimi.model.Storage;

import org.springframework.data.repository.CrudRepository;

public interface StorageRepository extends CrudRepository<Storage, PKSet>{
  
}
