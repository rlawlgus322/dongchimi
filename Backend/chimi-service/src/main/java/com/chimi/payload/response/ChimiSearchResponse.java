package com.chimi.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChimiSearchResponse {

    private List<ChimiResponse> chimiResponse;
    private int cnt;

}
