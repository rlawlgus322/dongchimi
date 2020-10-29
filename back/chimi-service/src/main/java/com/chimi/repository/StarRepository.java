package com.chimi.repository;

import com.chimi.model.PKSet;
import com.chimi.model.Star;

import org.springframework.data.repository.CrudRepository;

public interface StarRepository extends CrudRepository<Star, PKSet> {
 
}
