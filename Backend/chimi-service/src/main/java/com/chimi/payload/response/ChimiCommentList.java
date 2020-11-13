package com.chimi.payload.response;

import com.chimi.model.ChimiComment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChimiCommentList {
    private ChimiComment chimiComment;
    private boolean isLiked = false;
    private String nickname;
    private String profileImage;


	public ChimiCommentList(ChimiComment comment, Boolean isLiked){
        this.chimiComment = comment;
        this.isLiked = isLiked;
    }
}