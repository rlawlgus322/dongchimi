package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.response.userinfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User findUserinfoById(Long id) {
        User user = userRepository.getUserById(id);
        System.out.println(user.toString());
        return user;
    }

    @Override
    public User findUserinfoByEmail(String email) {
        User user = userRepository.getUserByEmail(email);
        return user;
    }

    @Override
    public User findUserinfoByNickname(String nickname) {
        return userRepository.getUserByNickname(nickname);
    }

    @Override
    public String getUsernameById(long id) {
        User user = userRepository.getUserById(id);
        return user.getUsername();
    }

    @Override
    public boolean duplicateCheckEmail(String email) {
        boolean ck =userRepository.existsUserByEmail(email);
        System.out.println(ck);
        return ck;
    }

    @Override
    public boolean duplicateCheckNickname(String nickname) {
        boolean ck = userRepository.existsUserByNickname(nickname);
        System.out.println(ck);
        return ck;
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

    @Override
    public List<userinfoResponse> USER_LIST(long[] idlist) {
        List<userinfoResponse> list = new ArrayList<>();
        for (int i = 0; i < idlist.length; i++){
            User user = userRepository.getUserById(idlist[i]);
            userinfoResponse userinfoResponse = new userinfoResponse();
            userinfoResponse.email = user.getEmail();
            userinfoResponse.gender = user.getGender();
            userinfoResponse.nickname =  user.getNickname();
            userinfoResponse.username = user.getUsername();
            userinfoResponse.profileImage = user.getProfileimage();
            userinfoResponse.prefer1 = user.getPrefer1();
            userinfoResponse.prefer2 = user.getPrefer2();
            userinfoResponse.prefer3 = user.getPrefer3();
            userinfoResponse.star = user.getStar();
            list.add(userinfoResponse);

        }
        return list;
    }


}
