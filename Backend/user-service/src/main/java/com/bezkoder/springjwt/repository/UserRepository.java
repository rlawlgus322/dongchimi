package com.bezkoder.springjwt.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.springjwt.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
	Optional<User> findByEmail(String email);
	Boolean existsByUsername(String username);
	User getUserByEmail(String email);
	User getUserByNickname(String nickname);
	User getUserById(long id);
	Boolean existsByEmail(String email);
	boolean existsUserByEmail(String email);
	boolean existsUserByNickname(String nickname);
	int countUsersByIdIsNotNull();



}
