package com.bezkoder.springjwt.response;

import io.swagger.annotations.ApiModelProperty;

public class userinfoResponse {
    @ApiModelProperty(value = "username", position = 1)
    public String username;
    @ApiModelProperty(value = "email", position = 2)
    public String email;
    @ApiModelProperty(value = "address", position = 3)
    public String address;
    @ApiModelProperty(value = "nickname", position = 4)
    public String nickname;
    @ApiModelProperty(value = "gender", position = 5)
    public int gender;
    @ApiModelProperty(value = "profileImage", position = 6)
    public String profileImage;
    @ApiModelProperty(value = "prefer1", position = 7)
    public String prefer1;
    @ApiModelProperty(value = "prefer2", position = 8)
    public String prefer2;
    @ApiModelProperty(value = "prefer3", position = 9)
    public String prefer3;
    @ApiModelProperty(value = "star", position = 10)
    public float star;

}
