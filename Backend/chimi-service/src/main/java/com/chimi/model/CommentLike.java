package com.chimi.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "CHIMI_COMMENT_LIKE")
public class CommentLike {
   
    @EmbeddedId
    private PKSet likePK;
    
    public CommentLike(PKSet likePK){
        this.likePK = likePK;
    }
}