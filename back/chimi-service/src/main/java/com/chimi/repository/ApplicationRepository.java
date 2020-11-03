package com.chimi.repository;

import java.util.List;

import com.chimi.model.Application;
import com.chimi.model.PKSet;

import org.springframework.data.repository.CrudRepository;

public interface ApplicationRepository extends CrudRepository<Application, PKSet> {
  List<Application> findByApplicationPKEmailOrderByCreatedateDesc(String email);
}
