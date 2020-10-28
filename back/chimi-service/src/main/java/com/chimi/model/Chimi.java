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
@Table( name = "CHIMI")
public class Chimi {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long hid;
	
	@NotNull
	private Long id;	// 방장 id
	
	@NotBlank
	@Size(max = 100)
	private String name;	// 취미 이름
	
	@Size(max = 1000)
	private String summary;	// 간략소개
	
	@Size(max = 10000)
	private String description;	// 소개

	@CreationTimestamp
    private LocalDateTime createdate;	// 생성일
	
	private int stars;	// 추천수
	private int views;	// 조회수
	
	
}
