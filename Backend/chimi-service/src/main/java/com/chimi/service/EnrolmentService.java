package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.Enrolment;
import com.chimi.model.PKSet;

public interface EnrolmentService {

	Enrolment save(Enrolment enrolment);

	List<Enrolment> findAllByRoomUserId(long id);

	List<Enrolment> findAllByHid(long hid);

	Optional<Enrolment> findById(PKSet pk);

	void delete(PKSet pk);
}
