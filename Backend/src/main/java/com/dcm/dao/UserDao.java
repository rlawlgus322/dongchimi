package com.dcm.dao;

import com.dcm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

public interface UserDao extends CrudRepository<User,String> {


}
