package com.dcm.boast.model;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentResponse {
	private Comment comment;
	private List<Comment> recomment; //내 댓글에 리플 단 댓글들 리스트
	private String nickname;
	private boolean islike = false;
	public CommentResponse(Comment comment, String nickname) {
		this.comment = comment;
		this.nickname = nickname;
	} 
	
	
}
