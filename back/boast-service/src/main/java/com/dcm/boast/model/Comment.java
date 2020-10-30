package com.dcm.boast.model;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
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
	@GeneratedValue
	private Long id;
	private Long reId;//내가 대댓글 단 댓글의 id
	@NotNull
	private Long bid; //게시물 id
	@NotBlank
	private String userId;
	@NotBlank
	private String comment;
	@CreationTimestamp
	private LocalDateTime createdate;
	private int like;
}
