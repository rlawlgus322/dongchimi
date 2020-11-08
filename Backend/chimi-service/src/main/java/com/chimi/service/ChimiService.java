package com.chimi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.chimi.model.Chimi;

public interface ChimiService {
	Chimi save(Chimi chimi);									//  취미 파티 저장
	Optional<Chimi> findById(long hid);				//	취미 파티 조회
	Page<Chimi> findAll(Pageable pageable);		//	모든 취미 파티 조회
	void deleteById(long hid);								// 취미 파티 삭제
	Page<Chimi> findByUserId(long id,Pageable pageable);
}