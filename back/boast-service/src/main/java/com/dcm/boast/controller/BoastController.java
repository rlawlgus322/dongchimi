package com.dcm.boast.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dcm.boast.model.Boast;
import com.dcm.boast.service.BoastService;

@RestController
public class BoastController {
	@Autowired
	private BoastService boastService;

	@GetMapping("/all")
	public ResponseEntity<?> findAll() {
		ResponseEntity<?> entity = null;

		try {
			entity = new ResponseEntity<List<Boast>>(boastService.allBoasts(), HttpStatus.OK);
		} catch (Exception e) {
			entity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return ResponseEntity.ok(boastService.allBoasts());
	}

	@PostMapping()
	public ResponseEntity<?> insert(@RequestBody Boast boast) {

		ResponseEntity<?> entity = null;

		try {
			entity = new ResponseEntity<Boast>(boastService.insert(boast), HttpStatus.CREATED);
		} catch (Exception e) {
			entity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return entity;
	}

	@GetMapping("/{boastId}")
	public ResponseEntity<?> findStudentsOfCourse(@PathVariable long boastId) {
//        List<Transaction> transactions = courseService.findTransactionsOfCourse(courseId);
//        if(CollectionUtils.isEmpty(transactions)){
//           return ResponseEntity.notFound().build();
//        }
//        List<Long> userIdList = transactions.parallelStream().map(t -> t.getUserId()).collect(Collectors.toList());
//        List<String> students = userClient.getUserNames(userIdList);
		return ResponseEntity.ok(boastService.findBoastById(boastId));
	}
}
