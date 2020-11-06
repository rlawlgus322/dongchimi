package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User findUserinfoById(long id) {
        User user = userRepository.getUserById(id);

        return user;
    }

    @Override
    public User findUserinfoByEmail(String email) {
        User user = userRepository.getUserByEmail(email);
        return user;
    }

    @Override
    public String getUsernameById(long id) {
        User user = userRepository.getUserById(id);
        return user.getUsername();
    }

    @Override
    public boolean duplicateCheckEmail(String email) {

        return userRepository.existsUserByEmail(email);
    }

    @Override
    public boolean duplicateCheckNickname(String nickname) {
        return userRepository.existsUserByNickname(nickname);
    }

    @Override
    public User update(User user) {
        User exuser = userRepository.getUserByEmail(user.getEmail());
        exuser.setNickname(user.getNickname());
        userRepository.save(exuser);
        return exuser;
    }

    @Override
    public void delete(String email) {
        User user = userRepository.getUserByEmail(email);
        userRepository.delete(user);
    }

    @Override
    public User getUserbyemail(String email) {
        User user = userRepository.getUserByEmail(email);
        return user;
    }

    @Override
    public long getidByEmail(String email) {
        User user = userRepository.getUserByEmail(email);
        long id = user.getId();
        return id;
    }

    @Override
    public void updateProfileImage(String email, String path) {
        User user = userRepository.getUserByEmail(email);
        user.setProfileimage(path);
        userRepository.save(user);
    }

	@Override
	public void save(User user) {
		userRepository.save(user);
	}
    
    
}
