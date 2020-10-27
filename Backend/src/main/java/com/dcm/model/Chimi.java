package com.dcm.model;

import java.time.LocalDateTime;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;

import lombok.*;

@Entity
@Data
@Table(name = "CHIMI")
public class Chimi {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long hid;               // pk

  @NotBlank
  private String id;              // 방장id

  @NotBlank
  @Size(max = 50)
  private String name;            // 취미이름

  @Size(max = 10000)
  private String description;     // 취미소개

  @Size(max = 10000)
  private String summary;         // 취미 간략소개

  private int total;              // 총 모집 인원
  private int to;                 // 현재 모집할 수 있는 인원

  private int stars;              // 추천수
  private int views;		          // 조회수


  @CreationTimestamp
    private LocalDateTime createdate; // 생성일

  
}
