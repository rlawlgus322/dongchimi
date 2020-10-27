package com.dcm.boast.service;

import com.dcm.boast.dao.BoastDao;
import com.dcm.boast.model.Boast;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class BoastServiceImpl implements BoastService {

	@Autowired
	private BoastDao boastDao;

	@Override
	public List<Boast> allBoasts() {
		return (List<Boast>) boastDao.findAll();
	}

	@Override
	public Boast findBoastById(long boastId) {
		return boastDao.findById(boastId).orElse(null);
	}

//	@Override
//	public Transaction saveTransaction(Transaction transaction) {
//		return transactionRepository.save(transaction);
//	}
}
