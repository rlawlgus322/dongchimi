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
<<<<<<< HEAD
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

=======
	public void testConnection() {
		try(Connection con =
					DriverManager.getConnection(
							"jdbc:oracle:thin:@localhost:1521:DCM",
							"system",
							"root")){

		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
>>>>>>> 19ac0148f00a5d160a54df0ea3a9c9322453f728
}
