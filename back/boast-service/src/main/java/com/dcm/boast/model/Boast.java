package com.dcm.boast.model;


import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;

import lombok.*;

@Data
@Entity
@Table(name = "BOAST")
@NoArgsConstructor
public class Boast {

    @Id
    @GeneratedValue
    private Long bid;

    @NotBlank
    private String userId;   // 자랑 유저 id
    
    @NotNull
    private Long hid;   // 취미 id
    
    @NotBlank
    @Size(max = 100)
    private String title;   // 취미 이름
    
    @Size(max = 1000)
    private String postImg;   // 간략소개
    
    @Size(max = 10000)
    private String contents;   // 소개

    @CreationTimestamp
    private LocalDateTime createdate;   // 생성일
    
    private String category;
    
    private int likes;   // 추천수
    private int views;   // 조회수


    @Builder
	private Boast(long bid, String uid,long hid,String title, String postImg, String contents, 
			String category, LocalDateTime createdate, int likes, int views) {
    	 this.bid = bid;
         this.userId = uid;
         this.hid = hid;
         this.title = title;
         this.postImg = postImg;
         this.contents = contents;
         this.createdate = createdate;
         this.category = category;
         this.likes = likes;
         this.views = views;
	}



    
    public Boast(Boast boast) {
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
