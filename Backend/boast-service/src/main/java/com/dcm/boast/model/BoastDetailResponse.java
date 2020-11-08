package com.dcm.boast.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoastDetailResponse {
	private Boast boast;
	private String nicknname;
	private String profileImage;
    private boolean isLiked = false;

    
    
}
