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
	
	
}
