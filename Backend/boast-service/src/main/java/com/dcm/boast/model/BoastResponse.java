package com.dcm.boast.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoastResponse {
	private Boast boast;
	private String nickname;
	private String profileImage;
    private boolean isLiked = false;
    

	public BoastResponse(Boast boast, String nickname, boolean isLiked) {
		this.boast = boast;
		this.nickname = nickname;
		this.isLiked = isLiked;
	}


	public BoastResponse(Boast bst, String nickname) {
		this.boast = bst;
		this.nickname = nickname;
	}
}
