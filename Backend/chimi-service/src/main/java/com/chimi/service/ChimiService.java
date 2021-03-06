package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.Application;
import com.chimi.model.Enrolment;
import com.chimi.model.Storage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.chimi.model.Chimi;

public interface ChimiService {
	Chimi save(Chimi chimi);									//  취미 파티 저장
	Optional<Chimi> findById(long hid);				//	취미 파티 조회
	Page<Chimi> findAll(Pageable pageable);		//	모든 취미 파티 조회
	void deleteById(long hid);								// 취미 파티 삭제
	Page<Chimi> findByUserId(long id,Pageable pageable);
	Page<Chimi> findbyCategory(String category, Pageable pageable);
	Page<Chimi> findbyName(String name, Pageable pageable);
	Page<Chimi> findbyCategoryAndName(String category,String name, Pageable pageable);
	List<Chimi> findByChimiId(List<Enrolment> list);
	List<Chimi> findByChimiIdApp(List<Application> list);
	List<Chimi> findByChimiIdStore(List<Storage> list);
	void updatechimiIsStart();
	List<Chimi> getChimisByName(String name);
	int countName(String name);
	int countCategory(String category);
	int countNameAndCategory(String name, String category);
	int countAll();


}