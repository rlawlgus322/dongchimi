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
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long hid;
	
	@NotNull
	private long id;	// 방장 id
	
	@NotBlank
	@Size(max = 100)
	private String name;	// 취미 이름
	

	
	@Size(max = 1000)
	private String summary;	// 간략소개
	
	@Size(max = 10000)
	private String description;	// 소개

	@CreationTimestamp
    private LocalDateTime createdate;	// 생성일
	
	private String image;		// 대표이미지
	private int stars=0;			// 추천수
	private int views =0;			// 조회수
	private int totalnum;		// 총 모집인원
	private int curnum=0;			// 현재 인원
	private String category;
	
}
