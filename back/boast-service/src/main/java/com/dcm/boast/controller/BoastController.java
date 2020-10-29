package com.dcm.boast.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dcm.boast.model.Boast;
import com.dcm.boast.service.BoastService;

import io.swagger.annotations.ApiOperation;

//http://localhost:8083/swagger-ui.html
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class BoastController {
	@Autowired
	private BoastService boastService;

	@GetMapping("/all")
	@ApiOperation(value = "모든 자랑게시물 반환")
	public ResponseEntity<?> findAll(@PageableDefault(size=10, sort="createdate",direction = Sort.Direction.DESC)Pageable pageable) {
		Page<Boast> list = boastService.allBoasts(pageable);
		if(list != null)		return new ResponseEntity<>(list, HttpStatus.OK);
		else					return new ResponseEntity<>(list, HttpStatus.BAD_REQUEST);
	}

	@PostMapping("/")
	@ApiOperation(value = "자랑게시물 작성")
	public ResponseEntity<?> insert(@RequestBody Boast boast) {

		ResponseEntity<?> entity = null;

		try {
			entity = new ResponseEntity<Boast>(boastService.insert(boast), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
	@PutMapping("/b/{boastId}")
	@ApiOperation(value = "수정하기")
	public ResponseEntity<?> update(@PathVariable long boastId, @RequestBody Boast boast) {

		ResponseEntity<?> entity = null;

		try {
			entity = new ResponseEntity<Boast>(boastService.update(boast,boastId), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return entity;
	}
	

	@GetMapping("/b/{boastId}")
	@ApiOperation(value = "해당 id값 게시물 가져오기")
	public ResponseEntity<?> find(@PathVariable long boastId) {
		ResponseEntity<?> entity = null;

		try {
			entity = new ResponseEntity<Boast>(boastService.findBoastById(boastId), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return entity;
//        List<Transaction> transactions = courseService.findTransactionsOfCourse(courseId);
//        if(CollectionUtils.isEmpty(transactions)){
//           return ResponseEntity.notFound().build();
//        }
//        List<Long> userIdList = transactions.parallelStream().map(t -> t.getUserId()).collect(Collectors.toList());
//        List<String> students = userClient.getUserNames(userIdList);
	}
	@DeleteMapping("/b/{boastId}")
	@ApiOperation(value = "해당 id값 삭제")
	public ResponseEntity<?> delete(@PathVariable long boastId) {
		if(boastService.findBoastById(boastId)!= null){
			boastService.delete(boastId);
			return new ResponseEntity<>(HttpStatus.OK);
		} else{
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

	}
	
	@PutMapping("/view/{boastId}")
	@ApiOperation(value = "조회수 올리기")
	public ResponseEntity<?> view(@PathVariable long boastId) {

		ResponseEntity<?> entity = null;

		try {
			entity = new ResponseEntity<Boast>(boastService.view(boastId), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return entity;
	}
	
	
}
