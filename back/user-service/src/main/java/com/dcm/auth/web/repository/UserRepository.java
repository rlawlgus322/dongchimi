package com.dcm.auth.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dcm.auth.web.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
  public User findByUsername(String username);
}
