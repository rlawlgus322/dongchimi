package com.chimi.service;

import com.chimi.model.Enrolment;
import com.chimi.model.PKSet;
import com.chimi.repository.EnrolmentRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrolmentServiceImpl implements EnrolmentService {

	@Autowired
	EnrolmentRepository enrolmentRepository;

	@Override
	public Enrolment save(Enrolment enrolment) {
		return enrolmentRepository.save(enrolment);
	}

	@Override
	public List<Enrolment> findAllByRoomUserId(long id) {
		return enrolmentRepository.findAllByRoomUserIdOrderByCreatedateDesc(id);
	}

	@Override
	public List<Enrolment> findAllByHid(long hid) {
		return enrolmentRepository.findAllByEnrolmentPKChimiId(hid);
	}

	@Override
	public void delete(PKSet pk) {
		enrolmentRepository.deleteById(pk);
	}

	@Override
	public Optional<Enrolment> findById(PKSet pk) {
		return enrolmentRepository.findById(pk);
	}
}
