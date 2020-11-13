package com.chimi.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "CHIMI_STAR")
public class ChimiStar {
   
    @EmbeddedId
    private PKSet starPK;
    
    public ChimiStar(PKSet starPK){
        this.starPK = starPK;
    }
}