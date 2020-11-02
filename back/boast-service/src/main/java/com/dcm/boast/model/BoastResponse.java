package com.dcm.boast.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class BoastResponse {
	private Boast boast;
	private String username;
    private boolean isLiked = false;
    
    public BoastResponse(Boast boast, String username) {
		this.boast = boast;
		this.username = username;
	}   
    
	public BoastResponse(Boast boast, String username, boolean isLiked) {
		this.boast = boast;
		this.username = username;
		this.isLiked = isLiked;
	}
    
    
}
