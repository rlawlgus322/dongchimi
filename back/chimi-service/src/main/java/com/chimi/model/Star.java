package com.chimi.model;

import java.time.LocalDateTime;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "STAR")
public class Star {
   
    @EmbeddedId
    private PKSet starPK;
    
    @CreationTimestamp
    private LocalDateTime createdate;
    
    public Star(PKSet starPK){
        this.starPK = starPK;
    }
}