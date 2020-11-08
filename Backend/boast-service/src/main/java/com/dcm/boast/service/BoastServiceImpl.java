package com.dcm.boast.service;

import com.dcm.boast.dao.BoastRepository;
import com.dcm.boast.dao.BoastStarRepository;
import com.dcm.boast.model.Boast;
import com.dcm.boast.model.BoastStar;
import com.dcm.boast.model.PKSet;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class BoastServiceImpl implements BoastService {

	@Autowired
	private BoastRepository boastRepository;
	
	@Autowired
	private BoastStarRepository boastStarRepository;

	@Override
	public Page<Boast> allBoasts(Pageable pageable) {
		return boastRepository.findAll(pageable);
	}

	// 페이지 구성시 https://blog.naver.com/anytimedebug/221345293638

	@Override
	public Boast findBoastById(long boastId) {
		return boastRepository.findById(boastId).orElse(null);
	}
	@Override
	public Boast insert(Boast boast) {
		Boast cboast = boastRepository.save(boast);
		return new Boast(cboast);
	}
	@Override
	public Boast update(Boast boast, long id){
		Boast nboast = this.findBoastById(id);
		
		nboast.setTitle(boast.getTitle());
		nboast.setContents(boast.getContents());
		nboast.setPostImg(boast.getPostImg());
		Boast rboast = boastRepository.save(nboast);

		return rboast;
	}
	@Override
	public void delete(long id) {
		boastRepository.deleteById(id);
	}
	
	@Override
	public Boast view(long id) {
		Boast nboast = this.findBoastById(id);
		nboast.setViews(nboast.getViews()+1);
		return boastRepository.save(nboast);
	}

	@Override
	public Boast like(BoastStar boastStar) {
		Boast nboast = this.findBoastById(boastStar.getStarPK().getBoastId());
		nboast.setLikes(nboast.getLikes()+1);
		boastStarRepository.save(boastStar); //좋아요 테이블에 추가
		return boastRepository.save(nboast);
	}

	@Override
	public Boast dislike(BoastStar boastStar) {
		Boast nboast =this.findBoastById(boastStar.getStarPK().getBoastId());
		nboast.setLikes(nboast.getLikes()-1);
		boastStarRepository.delete(boastStar); //좋아요 테이블에 추가
		return boastRepository.save(nboast);
	}
	@Override
	public boolean isLike(long id,long bid) {
		Optional<BoastStar> boastStar = boastStarRepository.findById(new PKSet(id,bid));
		if(boastStar.isPresent()) return true;
		else return false;
	}

}
