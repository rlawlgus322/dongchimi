package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.response.userinfoResponse;

import java.util.List;

public interface UserService {
    User findUserinfoById(Long id);
    User findUserinfoByEmail(String email);
    User findUserinfoByNickname(String nickname);
    String getUsernameById(long id);
    boolean duplicateCheckEmail(String email);
    boolean duplicateCheckNickname(String nickname);
    User update(User user);
    void delete(String email);
    User getUserbyemail(String email);
    long getidByEmail(String email);
    void updateProfileImage(String email, String path);
	void save(User user);
	List<userinfoResponse> USER_LIST(long[] idlist);

}
