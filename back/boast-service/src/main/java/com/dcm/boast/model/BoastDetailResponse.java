package com.dcm.boast.model;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BoastDetailResponse {
	private Boast boast;
	private String nicknname;
    private boolean isLiked = false;

    public BoastDetailResponse(Boast boast, String nicknname) {
		this.boast = boast;
		this.nicknname = nicknname;
	}
    
	public BoastDetailResponse(Boast boast, String nicknname, boolean isLiked) {
		this.boast = boast;
		this.nicknname = nicknname;
		this.isLiked = isLiked;
	}
    
    
}
