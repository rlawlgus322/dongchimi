package com.dcm.boast.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class BoastResponse {
	private Boast boast;
	private String nickname;
    private boolean isLiked = false;
    
//    public BoastResponse(Boast boast, String nickname) {
//		this.boast = boast;
//		this.nickname = nickname;
//	}   
    
	public BoastResponse(Boast boast, String nickname, boolean isLiked) {
		this.boast = boast;
		this.nickname = nickname;
		this.isLiked = isLiked;
	}


	public BoastResponse(Boast bst, String nickname) {
	}
}
