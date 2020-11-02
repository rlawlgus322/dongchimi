package com.chimi.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "LIKECOMMENT")
public class Like {
   
    @EmbeddedId
    private PKSet likePK;
    
    public Like(PKSet likePK){
        this.likePK = likePK;
    }
}