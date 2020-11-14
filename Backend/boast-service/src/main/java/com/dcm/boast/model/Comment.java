package com.dcm.boast.model;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "BOASTCOMMENT")
@NoArgsConstructor
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;
	private long reId;//내가 대댓글 단 댓글의 id
	@NotNull
	private long bid; //게시물 id
	@NotNull
	private long userId;
	@NotBlank
	private String content;
	@CreationTimestamp
	private LocalDateTime createdate;
	private int likes=0;
}
