package com.chimi.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chimi.intercomm.UserClient;
import com.chimi.model.Application;
import com.chimi.model.Chimi;
import com.chimi.model.PKSet;
import com.chimi.service.ApplicationService;
import com.chimi.service.ChimiService;

import io.swagger.annotations.ApiOperation;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/apply")
public class ApplicationContorller {
	//신청자 api
	@Autowired
	ApplicationService applicationService;
	@Autowired
	ChimiService chimiService;
	@Autowired
    UserClient userClient;

	@PostMapping("/{hid}")
	@ApiOperation(value = "파티 신청")
	public ResponseEntity<String> apply(@RequestHeader("accessToken") String access, @PathVariable long hid) {
		//만약 정원 다차면 파티 신청 안됨
		Chimi chimi = chimiService.findById(hid).get();
		if (chimi.getCurnum() == chimi.getTotalnum())
			return new ResponseEntity<>("full", HttpStatus.NOT_ACCEPTABLE);

		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		Application newApplication = new Application(new PKSet(Long.parseLong(String.valueOf(userinfo.get("id"))), hid), chimi.getUserId());
		newApplication = applicationService.save(newApplication);

		if (newApplication != null)
			return new ResponseEntity<>("success", HttpStatus.OK);
		else
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/applicant")
	@ApiOperation(value = "내가 신청한 파티 신청 조회")
	public ResponseEntity<List<Application>> searchApplication(@RequestHeader("accessToken") String access) {
		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		List<Application> list = applicationService.findByApplicationPKUserId(Long.parseLong(String.valueOf(userinfo.get("id"))));
		if (list == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@DeleteMapping("/applicant/{hid}")
	@ApiOperation(value = "파티 신청 취소")
	public ResponseEntity<String> disapply(@RequestHeader("accessToken") String access, @PathVariable long hid) {
		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		PKSet pk = new PKSet(Long.parseLong(String.valueOf(userinfo.get("id"))), hid);

		if (applicationService.findById(pk).isPresent()) {
			applicationService.deleteById(pk);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
		}
	}
	@DeleteMapping("/moderator/{hid}")
	@ApiOperation(value = "나에게 온 신청 거부")
	public ResponseEntity<String> disagree(@RequestHeader("accessToken") String access, @PathVariable long hid) {
		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		Application application = applicationService.findByHidAndRoomUserId(hid,Long.parseLong(String.valueOf(userinfo.get("id")))).get();
		if (application!=null) {
			applicationService.deleteById(application.getApplicationPK());
			return new ResponseEntity<>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
		}
	}
	
	///방장
	@GetMapping("/moderator")
	@ApiOperation(value = "나에게 온 파티 신청 보여주기")
	public ResponseEntity<List<Application>> selectallApply(@RequestHeader("accessToken") String access) {
		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		List<Application> list = applicationService.findAllByRoomUserId(Long.parseLong(String.valueOf(userinfo.get("id"))));
		if(list == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		else return new ResponseEntity<>(list, HttpStatus.OK);
	}
	

}
