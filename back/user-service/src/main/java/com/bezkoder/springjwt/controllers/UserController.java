package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Email;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/info/name/{Id}")
    @ApiOperation(value = "유저정보 보내주기")
    public ResponseEntity<?> getuserinfo(@PathVariable long Id) {

        ResponseEntity<?> entity = null;

        try {
            entity = new ResponseEntity<>(userService.getUsernameById(Id), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return entity;
    }


}
