package com.chimi.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.chimi.model.Chimi;

public interface ChimiService {
	Chimi save(Chimi chimi);				//  취미 파티 저장
	Optional<Chimi> findById(Long hid);		//	취미 파티 조회
	Page<Chimi> findAll(Pageable pageable);				//	모든 취미 파티 조회
}
