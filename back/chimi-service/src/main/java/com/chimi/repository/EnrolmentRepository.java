package com.chimi.repository;

import com.chimi.model.Enrolment;
import com.chimi.model.PKSet;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnrolmentRepository extends CrudRepository<Enrolment, PKSet> {

	List<Enrolment> findAllByRoomUserIdOrderByCreatedateDesc(long id);

	List<Enrolment> findAllByApplicationPKHid(Long hid);

}
