package com.dcm.boast.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "BOAST_COMMENT_STAR")
@NoArgsConstructor
@AllArgsConstructor
public class CommentStar {
	@EmbeddedId
    private PKSet starPK;

}
