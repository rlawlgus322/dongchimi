package com.chimi.payload.response;

import java.time.LocalDateTime;

import com.chimi.model.Chimi;

import lombok.*;

@Data
public class ChimiList {
	private Long hid;
	private Long id;	// 방장 id
	private String name;	// 취미 이름
	private String summary;	// 간략소개
	private String description;	// 소개
	private LocalDateTime createdate;	// 생성일
	private String image;		// 대표이미지
	private int stars;	// 추천수
	private int views;	// 조회수
	private int totalnum;		// 총 모집인원
	private int curnum;			// 현재 인원
	private boolean isRecommend;	// 추천 여부
	
	public ChimiList(){
		this.isRecommend = false;
	}

	public ChimiList(Chimi chimi, Boolean isRecommend){
		this.hid = chimi.getHid();
		this.id = chimi.getId();
		this.name = chimi.getName();
		this.summary = chimi.getSummary();
		this.description = chimi.getDescription();
		this.createdate = chimi.getCreatedate();
		this.image = chimi.getImage();
		this.stars = chimi.getStars();
		this.views = chimi.getViews();
		this.totalnum = chimi.getTotalnum();
		this.curnum = chimi.getCurnum();
		this.isRecommend = isRecommend;
	}
}
