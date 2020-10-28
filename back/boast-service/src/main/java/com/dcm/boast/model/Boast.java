package com.dcm.boast.model;


import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;

import lombok.*;


@Entity
@Data
@Table(name = "BOAST")
public class Boast {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long pid;

    @NotBlank
    private String uid;   // 자랑 유저 id
    
    @NotBlank
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
    
    private int stars;   // 추천수
    private int views;   // 조회수


    public Boast toEntity() {
      return Boast.builder()
          .pid(pid)
          .uid(uid)
          .hid(hid)
          .title(title)
          .postImg(postImg)
          .contents(contents)
          .createdate(createdate)
          .stars(stars)
          .views(views)
          .build();
    }
    
    public Boast(Boast boast) {
      this.pid = boast.getPid();
      this.uid = boast.getUid();
      this.hid = boast.getHid();
      this.title = boast.getTitle();
      this.postImg = boast.getPostImg();
      this.contents = boast.getContents();
      this.createdate = boast.getCreatedate();
      this.stars = boast.getStars();
      this.views = boast.getViews();
    }
  
  

}
