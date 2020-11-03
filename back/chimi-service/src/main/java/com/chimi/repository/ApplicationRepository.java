package com.chimi.repository;

import java.util.List;
import java.util.Optional;

import com.chimi.model.Application;
import com.chimi.model.PKSet;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends CrudRepository<Application, PKSet> {
	List<Application> findAllByApplicationPKUserIdOrderByCreatedateDesc(long userId);
	List<Application> findAllByRoomUserIdOrderByCreatedateDesc(long id);
	Optional<Application> findByApplicationPKHidAndfindByRoomUserId(long hid,long userId);
}
