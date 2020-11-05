package com.chimi.payload.response;

import com.chimi.model.ChimiComment;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChimiCommentList {
    private ChimiComment chimiComment;
    private boolean isLiked = false;


	public ChimiCommentList(ChimiComment comment, Boolean isLiked){
        this.chimiComment = comment;
        this.isLiked = isLiked;
    }
}