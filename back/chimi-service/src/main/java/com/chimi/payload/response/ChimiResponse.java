package com.chimi.payload.response;

import com.chimi.model.Chimi;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChimiResponse {
	private Chimi chimi;
	private String nickname;
	private String profileImage;
	private boolean isRecommend = false;;	// 추천 여부
	

	public ChimiResponse(Chimi chimi, Boolean isRecommend){
		this.chimi = chimi;
		this.isRecommend = isRecommend;
	}
	
}
