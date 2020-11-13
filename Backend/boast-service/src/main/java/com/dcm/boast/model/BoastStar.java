package com.dcm.boast.model;


import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "BOAST_STAR")
@NoArgsConstructor
@AllArgsConstructor
public class BoastStar {

	@EmbeddedId
    private PKSet starPK;
	
	
}
