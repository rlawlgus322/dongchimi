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

	// 페이지 구성시 https://blog.naver.com/anytimedebug/221345293638
	// public BoardListDTO list(Boast model) throws Exception {
	// Page<Boast> page = boastDao.findAll(model.toSpecification(), model.toPage());
	// model.setList(page.getContent());
	// model.setTotalCount(page.getTotalElements());

	// return model;
	// }

	@Override
	public Boast findBoastById(long boastId) {
		return boastDao.findById(boastId).orElse(null);
	}
	@Override
	public Boast insert(Boast boast) {
		Boast cboast = boastDao.save(boast);
		return new Boast(cboast);
	}
	@Override
	public Boast update(Boast boast, long id){
		Boast nboast = this.findBoastById(id);
		
		nboast.setTitle(boast.getTitle());
		nboast.setContents(boast.getContents());
		nboast.setPostImg(boast.getPostImg());
		Boast rboast = boastDao.save(nboast);

		return new Boast(rboast);
	}

	public void delete(long id) {
		this.findBoastById(id);
		boastDao.deleteById(id);
	}

}
