package com.dcm.auth.web.service;

import com.dcm.auth.web.model.User;

public interface UserService {
  void saveUser(User user,String[] roles);
  User findByUsername(String username);
}
