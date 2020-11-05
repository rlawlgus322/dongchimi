package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.PKSet;
import com.chimi.model.Storage;
import com.chimi.repository.StorageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StorageServiceImpl implements StorageService {

  @Autowired
  StorageRepository storageRepository;

  @Override
  public Storage save(Storage storage) {
    return storageRepository.save(storage);
  }

  @Override
  public void deleteById(PKSet pk) {
    storageRepository.deleteById(pk);
  }

  @Override
  public Optional<Storage> findById(PKSet pk) {
    return storageRepository.findById(pk);
  }

  @Override
  public List<Storage> findByStoragePKUserId(long id) {
    return storageRepository.findByStoragePK_UserIdOrderByCreatedateDesc(id);
  }
  
}
