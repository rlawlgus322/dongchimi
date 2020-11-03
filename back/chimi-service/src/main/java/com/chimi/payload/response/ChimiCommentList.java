package com.chimi.payload.response;

import java.time.LocalDateTime;

import com.chimi.model.ChimiComment;


import lombok.Data;

@Data
public class ChimiCommentList {
    private Long cid;               // 댓글 PK
    private String email;           // 댓글 작성자 이메일
    private Long hid;               // 댓글 단 취미 id
    private int likes;              // 댓글 좋아요 수
    private String content;	        // 내용
    private LocalDateTime createdate;
    private boolean isLiked;

    public ChimiCommentList(){
		this.isLiked = false;
	}

	public ChimiCommentList(ChimiComment comment, Boolean isLiked){
        this.cid = comment.getCid();
        this.email = comment.getEmail();
        this.hid = comment.getHid();
        this.likes = comment.getLikes();
        this.content = comment.getContent();
        this.createdate = comment.getCreatedate();
        this.isLiked = isLiked;
    }
}