package com.chimi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.chimi.model.Chimi;

@Repository
public interface ChimiRepository extends CrudRepository<Chimi, Long>{

}
