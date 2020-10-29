package com.dcm.boast.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dcm.boast.model.Boast;

public interface BoastService {
	Page<Boast> allBoasts(Pageable pageable);
	Boast findBoastById(long boastId);
	void delete(long boastId);
	Boast insert(Boast boast);
	Boast update(Boast boast, long id);
	Boast view(long id);
  
}
