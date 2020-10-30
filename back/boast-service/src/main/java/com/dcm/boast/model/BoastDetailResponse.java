package com.dcm.boast.model;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BoastDetailResponse {
	private Boast boast;
	private String username;
	private List<CommentResponse> comments;
    private boolean isLiked = false;

    public BoastDetailResponse(Boast boast, String username) {
		this.boast = boast;
		this.username = username;
	}
    
	public BoastDetailResponse(Boast boast, String username, List<CommentResponse> comments, boolean isLiked) {
		this.boast = boast;
		this.username = username;
		this.comments = comments;
		this.isLiked = isLiked;
	}
    
    
}
