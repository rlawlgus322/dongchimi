package com.chimi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chimi.model.Chimi;
import com.chimi.service.ChimiService;

import io.swagger.annotations.ApiOperation;

//http://localhost:8080/swagger-ui.html
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/chimi")
public class ChimiController {
	@Autowired
	ChimiService chimiService;
	
	@PostMapping
	@ApiOperation(value = "새 취미 파티 게시 ")
	public ResponseEntity<String> insert(@RequestBody Chimi chimi) {
		Chimi newChimi = chimiService.save(chimi);	// 취미 파티 저장
		if(newChimi != null)	return new ResponseEntity<>("success", HttpStatus.OK);
		else					return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	}
	
}
