package com.chimi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.chimi.model.Application;
import com.chimi.model.Enrolment;
import com.chimi.model.Storage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.chimi.model.Chimi;
import com.chimi.repository.ChimiRepository;

@Service
public class ChimiServiceImpl implements ChimiService{
	@Autowired
	ChimiRepository chimiRepository;

	@Override
	public Chimi save(Chimi chimi) {
		return chimiRepository.save(chimi);
	}

	@Override
	public Optional<Chimi> findById(long hid) {
		return chimiRepository.findById(hid);
	}

	@Override
	public Page<Chimi> findAll(Pageable pageable) {
		return chimiRepository.findAll(pageable);
	}

	@Override
	public void deleteById(long hid) {
		chimiRepository.deleteById(hid);
	}

	@Override
	public Page<Chimi> findByUserId(long id,Pageable pageable) {
		return  chimiRepository.findAllByUserId(id,pageable);
	}

	@Override
	public List<Chimi> findByChimiId(List<Enrolment> list) {
		List<Chimi> chimiList = new ArrayList<>();
		for (int i =0; i<list.size(); i++){
			Chimi chimi = chimiRepository.getChimiByHid(list.get(i).getEnrolmentPK().getChimiId());
			chimiList.add(chimi);
		}
		return chimiList;
	}
	@Override
	public List<Chimi> findByChimiIdApp(List<Application> list) {
		List<Chimi> chimiList = new ArrayList<>();
		for (int i =0; i<list.size(); i++){
			Chimi chimi = chimiRepository.getChimiByHid(list.get(i).getApplicationPK().getChimiId());
			chimiList.add(chimi);
		}
		return chimiList;
	}

	@Override
	public List<Chimi> findByChimiIdStore(List<Storage> list) {
		List<Chimi> chimiList = new ArrayList<>();
		for (int i =0; i<list.size(); i++){
			Chimi chimi = chimiRepository.getChimiByHid(list.get(i).getStoragePK().getChimiId());
			chimiList.add(chimi);
		}
		return chimiList;
	}
}
