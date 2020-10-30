package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.User;

public interface UserService {
    User findUserinfoById(long id);

}
