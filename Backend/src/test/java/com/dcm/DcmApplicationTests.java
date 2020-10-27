package com.dcm;

import com.dcm.model.User;
import com.dcm.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Connection;
import java.sql.DriverManager;

@SpringBootTest
class DcmApplicationTests {
	@Autowired
	private UserService userService;

	@Test
	void contextLoads() {
	}
	static {
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	void jointest(){
		User user = new User();
		user.setAddress("test");
		user.setGender("test");
		user.setEmail("test");
		user.setNickname("test");
		user.setName("test");
		System.out.println(user.toString());
		System.out.println(userService.join(user));

	}

}
