package com.dcm.dao;

import com.dcm.model.User;
import org.springframework.data.repository.CrudRepository;
public interface UserDao extends CrudRepository<User,String> {


}
