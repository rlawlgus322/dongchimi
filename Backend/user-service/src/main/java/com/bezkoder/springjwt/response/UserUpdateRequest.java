package com.bezkoder.springjwt.response;

import io.swagger.annotations.ApiModelProperty;

public class UserUpdateRequest {
    @ApiModelProperty(value = "nickname", position = 1)
    public String nickname;
    @ApiModelProperty(value = "prefer1", position = 1)
    public String prefer1;
    @ApiModelProperty(value = "prefer2", position = 1)
    public String prefer2;
    @ApiModelProperty(value = "prefer3", position = 1)
    public String prefer3;
    @ApiModelProperty(value = "image", position = 1)
    public String image;
}
