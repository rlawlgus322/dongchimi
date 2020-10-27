package com.chimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chimi.model.Chimi;
import com.chimi.repository.ChimiRepository;

@Service
public class ChimiServiceImpl implements ChimiService{
	@Autowired
	ChimiRepository chimiRepository;

	@Override
	public boolean save(Chimi chimi) {
		chimiRepository.save(chimi);
		return true;
	}
}
