package com.chimi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.chimi.model.Chimi;

@Repository
public interface ChimiRepository extends CrudRepository<Chimi, Long>{
	Page<Chimi> findAll(Pageable pageable);

	Page<Chimi> findAllByUserId(long id,Pageable pageable);

	Chimi getChimiByHid(long hid);

}
