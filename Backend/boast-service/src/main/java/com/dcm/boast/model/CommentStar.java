package com.dcm.boast.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "BOAST_COMMENT_STAR")
@NoArgsConstructor
public class CommentStar {
	@Id
	@NotNull
	private Long cmtId;
	@NotNull
	private Long userId;
	
	
	public CommentStar(@NotNull Long userId, @NotNull Long cmtId) {
		this.userId = userId;
		this.cmtId = cmtId;
	}
}
