package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.response.userinfoResponse;
import com.bezkoder.springjwt.security.jwt.JwtUtils;
import com.bezkoder.springjwt.service.FileService;
import com.bezkoder.springjwt.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserService userService;

    @Autowired
    FileService fileService;

    @GetMapping("/userinfo/name/{Id}")
    @ApiOperation(value = "유저이름 보내주기")
    public ResponseEntity<?> getusername(@PathVariable long Id) {

        ResponseEntity<?> entity = null;

        try {
            Map<String, Object> map = new HashMap<>();
            User user = userService.findUserinfoById(Id);
            map.put("email", user.getEmail());
            map.put("nickname", user.getNickname());
            map.put("profileImage", user.getProfileimage());
            entity = new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return entity;
    }

    @GetMapping("/userinfo/token/{token}")
    @ApiOperation(value = "유저이름 보내주기")
    public ResponseEntity<?> getutoken(@PathVariable String token) {

        ResponseEntity<?> entity = null;

        try {
            String useremail = jwtUtils.getUserNameFromJwtToken(token);
            User user = userService.getUserbyemail(useremail);
            Map<String, Object> map = new HashMap<>();
            map.put("id", userService.getidByEmail(user.getEmail()));
            map.put("nickname", user.getNickname());
            map.put("profileImage", user.getProfileimage());
            entity = new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return entity;
    }

    @GetMapping(value = "/userinfo/{email}")
    @ApiOperation(value = "유저정보 보내주기")
    public ResponseEntity<?> getuserinfo(@PathVariable String email, @RequestHeader("accessToken") String access) {

        ResponseEntity<?> entity = null;

        try {
            String userEmail = jwtUtils.getUserNameFromJwtToken(access);
            User user = userService.findUserinfoByEmail(email);
            userinfoResponse userinfoResponse = new userinfoResponse();
            userinfoResponse.email = user.getEmail();
            userinfoResponse.gender = user.getGender();
            userinfoResponse.nickname =  user.getNickname();
            userinfoResponse.username = user.getUsername();
            entity = new ResponseEntity<>(userinfoResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return entity;
    }

    @GetMapping("/userinfo/isemail/{email}")
    @ApiOperation(value = "이메일중복체크")
    public ResponseEntity<?> duplicateCheckEmail(@PathVariable String email, @RequestHeader("accessToken") String access) {

        ResponseEntity<?> entity = null;

        try {
            String userEmail = jwtUtils.getUserNameFromJwtToken(access);
            entity = new ResponseEntity<>(userService.duplicateCheckEmail(email), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return entity;
    }
    @GetMapping("/userinfo/isnick/{nickname}")
    @ApiOperation(value = "닉네임중복체크")
    public ResponseEntity<?> duplicateCheckNickname(@PathVariable String nickname, @RequestHeader("accessToken") String access) {

        ResponseEntity<?> entity = null;

        try {
            String userEmail = jwtUtils.getUserNameFromJwtToken(access);
            entity = new ResponseEntity<>(userService.duplicateCheckNickname(nickname), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return entity;
    }

    @PutMapping("/userinfo/{email}")
    @ApiOperation(value = "수정하기")
    public ResponseEntity<?> update(@PathVariable String email, @RequestBody User user ,@RequestHeader("accessToken") String access) {

        ResponseEntity<?> entity = null;

        try {
            String userEmail = jwtUtils.getUserNameFromJwtToken(access);
            User newuser = userService.update(user);
            userinfoResponse userinfo = new userinfoResponse();
            userinfo.nickname = newuser.getNickname();

            entity = new ResponseEntity<>(userinfo, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return entity;
    }

    @DeleteMapping("/userinfo/{email}")
    @ApiOperation(value = "회원탈퇴")
    public ResponseEntity<?> delete(@PathVariable String email) {
        if(userService.findUserinfoByEmail(email)!= null){
            userService.delete(email);
            return new ResponseEntity<>(HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @RequestMapping(method = RequestMethod.POST, value = "/userinfo/image", produces = "application/json")
    @ApiOperation(value = "이미지 업로드")
    @ApiResponses({
            @ApiResponse(code = 201, message = "이미지 업로드 성공"),
            @ApiResponse(code = 400, message = "잘못된 요청입니다"),
            @ApiResponse(code = 401, message = "로그인 후 이용해 주세요"),
            @ApiResponse(code = 403, message = "권한이 없습니다"),
            @ApiResponse(code = 404, message = "이미지 업로드 실패")
    })
    private ResponseEntity<?> create(@RequestParam(value = "file") MultipartFile image,@RequestHeader("accessToken") String access) {
        ResponseEntity<?> entity = null;
        try {
            String userEmail = jwtUtils.getUserNameFromJwtToken(access);
            String path = fileService.image(image);
            userService.updateProfileImage(userEmail, path);
            entity = new ResponseEntity<>(fileService.image(image), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return entity;
    }




}
