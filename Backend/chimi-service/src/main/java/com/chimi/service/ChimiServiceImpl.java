package com.chimi.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.time.LocalDate;

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
		String url = UUID.randomUUID().toString();
		chimi.setRtcurl(url);
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
	public Page<Chimi> findbyCategory(String category, Pageable pageable) {
		return chimiRepository.findChimisByCategory(category,pageable);
	}

	@Override
	public Page<Chimi> findbyName(String name, Pageable pageable) {
		return chimiRepository.findChimisByNameContains(name, pageable);
	}

	@Override
	public Page<Chimi> findbyCategoryAndName(String category, String name, Pageable pageable) {
		return chimiRepository.findChimisByCategoryAndNameContains(category, name, pageable);
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

	@Override
	public void updatechimiIsStart() {
		List<Chimi> list = chimiRepository.findChimisByHidIsNotNull();
		for (Chimi chimi : list ) {
			if( chimi.getStartdate().isBefore( LocalDate.now() )){
				chimi.setIsstart(true);
				chimiRepository.save(chimi);
			}
		}

	}

	@Override
	public List<Chimi> getChimisByName(String name) {

		return chimiRepository.getChimisByNameContains(name);
	}
}
