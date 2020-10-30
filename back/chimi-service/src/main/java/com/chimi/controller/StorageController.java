package com.chimi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

	@PostMapping
	@ApiOperation(value = "보관함에 저장")
	public ResponseEntity<String> insertStorage(String email, Long hid) {
		Storage newStorage = new Storage(new PKSet(email, hid));
		newStorage = storageService.save(newStorage);

		if(newStorage != null)	return new ResponseEntity<>("success", HttpStatus.OK);
		else										return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping
	@ApiOperation(value = "사용자의 보관함 조회")
	public ResponseEntity<List<Storage>> searchStorage(String email) {
		
		List<Storage> list = storageService.findByStoragePKEmail(email);

		if(list != null){
			return new ResponseEntity<>(list, HttpStatus.OK);
		} else{
			return new ResponseEntity<>(list, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping
	@ApiOperation(value = "보관함 삭제")
	public ResponseEntity<String> deleteStorage(String email, Long hid) {
		PKSet pk = new PKSet(email, hid);

		if(storageService.findById(pk).isPresent()){
			storageService.deleteById(pk);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} else{
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
		}
	}

}
