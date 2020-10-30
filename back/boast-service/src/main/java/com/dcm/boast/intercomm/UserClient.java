package com.dcm.boast.intercomm;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("userservice")
public interface UserClient {
//    @RequestMapping(method = RequestMethod.POST, value = "/", consumes = "application/json")
	@GetMapping("/{id}")
    String getUserName(@RequestBody String userId); //아직 안만들어짐
}
