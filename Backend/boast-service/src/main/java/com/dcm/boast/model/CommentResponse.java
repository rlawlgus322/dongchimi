package com.dcm.boast.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
	private Comment comment;
	private List<Comment> recomment = null; //내 댓글에 리플 단 댓글들 리스트
	private String nickname;
	private String profileImage;
	private boolean islike = false;
	public CommentResponse(Comment comment, String nickname, String profileImage) {
		this.comment = comment;
		this.nickname = nickname;
		this.profileImage = profileImage;
	} 
	
	
}
