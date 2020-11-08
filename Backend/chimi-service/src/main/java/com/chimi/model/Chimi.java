package com.chimi.model;

import java.time.LocalDateTime;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;

import lombok.*;

@Entity
@Data
@NoArgsConstructor
@Table( name = "CHIMI")
public class Chimi {
	@Id
	@Column(name = "hid")
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long hid;
	
	@Column(name = "userId")
	@NotNull
	private long userId;	// 방장 id
	
	@NotBlank
	@Size(max = 100)
	@Column(name = "name")
	private String name;	// 취미 이름
	

	@Column(name = "summary")
	@Size(max = 1000)
	private String summary;	// 간략소개
	
	@Column(name = "description")
	@Size(max = 10000)
	private String description;	// 소개

	@Column(name = "createdate")
	@CreationTimestamp
    private LocalDateTime createdate;	// 생성일
	
	@Column(name = "image")
	private String image;		// 대표이미지
	
	@Column(name = "stars")
	private int stars=0;			// 추천수
	
	@Column(name = "views")
	private int views =0;			// 조회수
	
	@Column(name = "totalnum")
	private int totalnum;		// 총 모집인원
	
	@Column(name = "curnum")
	private int curnum=0;			// 현재 인원
	
	@Column(name = "category")
	private String category;
	
}
