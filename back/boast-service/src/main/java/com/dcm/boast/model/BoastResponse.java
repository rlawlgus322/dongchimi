package com.dcm.boast.model;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class BoastResponse {
	private Long bid;
    private String userId;   // 자랑 유저 id
    private Long hid;   // 취미 id
    private String title;   // 취미 이름
    private String postImg;   // 간략소개
    private String contents;   // 소개
    private LocalDateTime createdate;   // 생성일    
    private String category;    
    private int likes;   // 추천수
    private int views;   // 조회수
    private boolean isLiked = false;


    public BoastResponse(Boast boast) {
    	this.bid = boast.getBid();
        this.userId = boast.getUserId();
        this.hid = boast.getHid();
        this.title = boast.getTitle();
        this.postImg = boast.getPostImg();
        this.contents = boast.getContents();
        this.createdate = boast.getCreatedate();
        this.category = boast.getCategory();
        this.likes = boast.getLikes();
        this.views = boast.getViews();
	}



    
}
