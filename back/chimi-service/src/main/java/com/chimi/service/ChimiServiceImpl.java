package com.chimi.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
	public Optional<Chimi> findById(Long hid) {
		return chimiRepository.findById(hid);
	}
}
