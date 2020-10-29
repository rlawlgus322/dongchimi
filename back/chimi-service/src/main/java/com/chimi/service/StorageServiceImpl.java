package com.chimi.service;

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
  
}
