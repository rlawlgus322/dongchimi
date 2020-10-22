package com.dcm;

import com.dcm.model.User;
import com.dcm.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DcmApplicationTests {
	@Autowired
	private UserService userService;

	@Test
	void contextLoads() {
	}

	@Test
	void jointest(){
		User user = new User();
		user.setAddress("test");
		user.setGender("test");
		user.setId("test");
		user.setNickname("test");
		user.setName("test");
		System.out.println(user.toString());
		System.out.println(userService.join(user));

	}

}
