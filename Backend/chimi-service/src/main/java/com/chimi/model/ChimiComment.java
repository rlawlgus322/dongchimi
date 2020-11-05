package com.chimi.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name = "CHIMI_COMMENT")
public class ChimiComment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long cid;        // 댓글 고유번호

    @NotBlank
    private Long userId;   // 댓글 작성자 이메일

    @NotNull
    private Long hid;       // 댓글 단 취미 id

    private int likes;      // 댓글 좋아요 수
    
    @Size(max = 1000)
    private String content;	// 내용

    @CreationTimestamp
    private LocalDateTime createdate;
    
}