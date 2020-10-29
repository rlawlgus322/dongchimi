package com.dcm.boast.service;

import com.dcm.boast.dao.BoastDao;
import com.dcm.boast.model.Boast;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class BoastServiceImpl implements BoastService {

	@Autowired
	private BoastDao boastDao;

	@Override
	public Page<Boast> allBoasts(Pageable pageable) {
		return boastDao.findAll(pageable);
	}

	// 페이지 구성시 https://blog.naver.com/anytimedebug/221345293638

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

		return rboast;
	}
	@Override
	public void delete(long id) {
		boastDao.deleteById(id);
	}
	
	@Override
	public Boast view(long id) {
		Boast nboast = this.findBoastById(id);
		nboast.setViews(nboast.getViews()+1);
		Boast rboast = boastDao.save(nboast);
		return rboast;
	}

}
