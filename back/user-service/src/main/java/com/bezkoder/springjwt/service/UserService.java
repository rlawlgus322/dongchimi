package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.User;

public interface UserService {
    User findUserinfoById(long id);
    User findUserinfoByEmail(String email);
    String getUsernameById(long id);
    boolean duplicateCheckEmail(String email);
    boolean duplicateCheckNickname(String nickname);
    User update(User user);
    void delete(String email);
    User getUserbyemail(String email);
    long getidByEmail(String email);

}
