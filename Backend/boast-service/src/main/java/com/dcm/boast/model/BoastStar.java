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
@Table(name = "BOAST_STAR")
@NoArgsConstructor
public class BoastStar {

	@Id
	@NotNull
	private long bid;
	@NotNull
	private long userId;
	
	
	public BoastStar(@NotBlank long userId, @NotNull long bid) {
		this.userId = userId;
		this.bid = bid;
	}
	
}
