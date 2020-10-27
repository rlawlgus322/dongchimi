package com.dcm.boast.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	@GetMapping("/boast/all")
    public ResponseEntity<?> findAllCourses(){
        return ResponseEntity.ok(boastService.allBoasts());
    }

    @PostMapping("/boast")
    public ResponseEntity<?> saveTransaction(@RequestBody Boast boast) {
		return null;
//        transaction.setDateOfIssue(LocalDateTime.now());
//        transaction.setCourse(courseService.findCourseById(transaction.getCourse().getId()));
//        return new ResponseEntity<>(boastService.saveTransaction(transaction), HttpStatus.CREATED);
    }

    @GetMapping("/boast/{boastId}")
    public ResponseEntity<?> findStudentsOfCourse(@PathVariable long boastId){
//        List<Transaction> transactions = courseService.findTransactionsOfCourse(courseId);
//        if(CollectionUtils.isEmpty(transactions)){
//           return ResponseEntity.notFound().build();
//        }
//        List<Long> userIdList = transactions.parallelStream().map(t -> t.getUserId()).collect(Collectors.toList());
//        List<String> students = userClient.getUserNames(userIdList);
        return ResponseEntity.ok(boastService.findBoastById(boastId));
    }
}