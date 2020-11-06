package com.chimi.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chimi.intercomm.UserClient;
import com.chimi.model.Application;
import com.chimi.model.Chimi;
import com.chimi.model.Enrolment;
import com.chimi.model.PKSet;
import com.chimi.service.ApplicationService;
import com.chimi.service.ChimiService;
import com.chimi.service.EnrolmentService;

import io.swagger.annotations.ApiOperation;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/enrolment")
public class EnrolmentController {
	//방장 api
	@Autowired
	EnrolmentService enrolmentService;
	@Autowired
    UserClient userClient;
	@Autowired
	ApplicationService applicationService;
	@Autowired
	ChimiService chimiService;
	
	@PostMapping
	@ApiOperation(value = "파티 신청 승낙")
	public ResponseEntity<String> agreeApply(@RequestHeader("accessToken") String access,@RequestBody PKSet pk) {
		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		Optional<Application> application = applicationService.findById(pk); // 파티 신청 정보
		
		if(Long.parseLong(String.valueOf(userinfo.get("id"))) == application.get().getRoomUserId() //승낙하려는 사용자 id와 취미에 등록된 id정보같나 확인
				&& application.isPresent()){
			long hid = application.get().getApplicationPK().getChimiId();
			Chimi chimi = chimiService.findById(hid).get();
			if(chimi==null) return new ResponseEntity<>("chimi not found", HttpStatus.NOT_FOUND);
			
			int curnum = chimi.getCurnum(); //현재 등록된 인원			
			if(curnum == chimi.getTotalnum()) return new ResponseEntity<>("chimi is full", HttpStatus.BAD_REQUEST);
			
			applicationService.deleteById(pk); //신청완료되면 기존거 지우고 등록으로 추가
			chimi.setCurnum(curnum+1); //등록시키면 현재 내 파티인원 늘리기
			
			enrolmentService.save(new Enrolment(application.get().getApplicationPK(),application.get().getRoomUserId())); //등록 추가
			return new ResponseEntity<>("success", HttpStatus.OK);
		} else{
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/{hid}")
	@ApiOperation(value = "파티에 등록된 파티 사람 보기")
	public ResponseEntity<List<Enrolment>> selectAllinParty(@PathVariable long hid) {
		List<Enrolment> list = enrolmentService.findAllByHid(hid);
		if(list == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		else return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@GetMapping
	@ApiOperation(value = "나에게 등록된 사람 보기")
	public ResponseEntity<List<Enrolment>> selectAll(@RequestHeader("accessToken") String access) {
		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		List<Enrolment> list = enrolmentService.findAllByRoomUserId(Long.parseLong(String.valueOf(userinfo.get("id"))));
		if(list == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		else return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@DeleteMapping
	@ApiOperation(value = "등록된 파티 사람 지우기")
	public ResponseEntity<String> delete(@RequestHeader("accessToken") String access,@RequestBody PKSet pk) {
		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		Optional<Application> application = applicationService.findById(pk);
		if(application.get().getRoomUserId() == (Long.parseLong(String.valueOf(userinfo.get("id"))))) { //내가 등록한 사람이면
			long hid = application.get().getApplicationPK().getChimiId();
			Chimi chimi = chimiService.findById(hid).get();
			if(chimi==null) return new ResponseEntity<>("chimi not found", HttpStatus.NOT_FOUND);
			
			int curnum = chimi.getCurnum(); //현재 등록된 인원			
			if(curnum == 0) return new ResponseEntity<>("chimi's peple is none", HttpStatus.BAD_REQUEST);
			
			applicationService.deleteById(pk); 
			chimi.setCurnum(curnum-1); //등록파기시키면 현재 내 파티인원 줄리기
			
			enrolmentService.delete(pk);//지운다
			return new ResponseEntity<>("success",HttpStatus.OK);
		}
		else return new ResponseEntity<>("fail",HttpStatus.BAD_REQUEST);
	}
}
