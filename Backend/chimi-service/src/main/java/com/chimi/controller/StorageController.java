package com.chimi.controller;

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

import java.util.HashMap;
import java.util.List;

import com.chimi.intercomm.UserClient;
import com.chimi.model.PKSet;
import com.chimi.model.Storage;
import com.chimi.service.StorageService;

import io.swagger.annotations.ApiOperation;

//http://localhost:8080/swagger-ui.html
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/storage")
public class StorageController {
	@Autowired
	StorageService storageService;
	@Autowired
    UserClient userClient;
	@PostMapping("/{hid}")
	@ApiOperation(value = "보관함에 저장")
	public ResponseEntity<String> insertStorage(@RequestHeader("accessToken") String access,@PathVariable long hid) {
		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		Storage newStorage = new Storage(new PKSet(Long.parseLong(String.valueOf(userinfo.get("id"))),hid));
		newStorage = storageService.save(newStorage);

		if(newStorage != null)	return new ResponseEntity<>("success", HttpStatus.OK);
		else										return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping
	@ApiOperation(value = "사용자의 보관함 조회")
	public ResponseEntity<List<Storage>> searchStorage(@RequestHeader("accessToken") String access) {
		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		List<Storage> list = storageService.findByStoragePKUserId(Long.parseLong(String.valueOf(userinfo.get("id"))));

		if(list != null){
			return new ResponseEntity<>(list, HttpStatus.OK);
		} else{
			return new ResponseEntity<>(list, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping
	@ApiOperation(value = "보관함 삭제")
	public ResponseEntity<String> deleteStorage(@RequestHeader("accessToken") String access, long hid) {
		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		PKSet pk = new PKSet(Long.parseLong(String.valueOf(userinfo.get("id"))), hid);

		if(storageService.findById(pk).isPresent()){
			storageService.deleteById(pk);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} else{
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
		}
	}

}
