package com.chimi.intercomm;

import java.util.HashMap;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("userservice")
public interface UserClient {
//    @RequestMapping(method = RequestMethod.POST, value = "/", consumes = "application/json")
	@GetMapping("/userinfo/token/{token}")
	HashMap<String,Object> getUserInfo(@PathVariable String token);
	
	@GetMapping("/userinfo/name/{Id}")
	HashMap<String,Object> getusername(@PathVariable long Id);
}