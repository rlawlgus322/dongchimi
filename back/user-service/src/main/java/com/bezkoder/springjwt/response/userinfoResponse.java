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

}
