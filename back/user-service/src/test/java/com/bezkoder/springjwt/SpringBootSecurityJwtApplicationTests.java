package com.bezkoder.springjwt;

import com.bezkoder.springjwt.models.ERole;
import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.repository.RoleRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringBootSecurityJwtApplicationTests {

	@Autowired
	RoleRepository roleRepository;

	@Test
	public void contextLoads() {
	}

	@Test
	public void roles(){
		Role role = new Role();
		Role role2 = new Role();
		Role role3 = new Role();
		role.setName(ERole.ROLE_ADMIN);
		roleRepository.save(role);
		role2.setName(ERole.ROLE_MODERATOR);
		roleRepository.save(role2);
		role3.setName(ERole.ROLE_USER);
		roleRepository.save(role3);
	}

}
