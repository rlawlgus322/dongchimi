package com.chimi.payload.response;

import com.chimi.model.Chimi;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChimiDetailResponse {
	private Chimi chimi;
	private String nickname;
	private String profileImage;
	private boolean isRecommend = false;	// 추천 여부
	private boolean isStored = false;	// 찜 여부
	private boolean isApplicated = false;	// 지원 여부
	

	public ChimiDetailResponse(Chimi chimi, Boolean isRecommend){
		this.chimi = chimi;
		this.isRecommend = isRecommend;
	}
	public ChimiDetailResponse(Chimi chimi, String nickname,String profileImage){
		this.chimi = chimi;
		this.nickname=nickname;
		this.profileImage=profileImage;
	}
	
}
