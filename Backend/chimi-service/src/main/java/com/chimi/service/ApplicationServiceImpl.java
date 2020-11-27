package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.intercomm.UserClient;
import com.chimi.model.Application;
import com.chimi.model.Chimi;
import com.chimi.model.PKSet;
import com.chimi.repository.ApplicationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationServiceImpl implements ApplicationService {

	@Autowired
	ApplicationRepository applicationRepository;
	@Autowired
	private UserClient userClient;

	@Override
	public Application save(Application application) {
		return applicationRepository.save(application);
	}

	@Override
	public void deleteById(PKSet pk) {
		applicationRepository.deleteById(pk);
	}

	@Override
	public Optional<Application> findById(PKSet pk) {
		return applicationRepository.findById(pk);
	}

	@Override
	public List<Application> findByApplicationPKUserId(long id) {
		return applicationRepository.findAllByApplicationPKUserIdOrderByCreatedateDesc(id);
	}

	@Override
	public List<Application> findAllByRoomUserId(long id) {
		return  applicationRepository.findAllByRoomUserIdOrderByCreatedateDesc(id);
	}

	@Override
	public Optional<Application> findByHidAndRoomUserId(long hid, long id) {
		return applicationRepository.findByApplicationPK_ChimiIdAndRoomUserId(hid,id);
	}

	@Override
	public List<Application> findByHid(long hid) {
		List<Application> list = applicationRepository.getApplicationsByApplicationPK_ChimiId(hid);

		for (Application apply : list
			 ) {

		}
		return applicationRepository.getApplicationsByApplicationPK_ChimiId(hid);
	}

}
