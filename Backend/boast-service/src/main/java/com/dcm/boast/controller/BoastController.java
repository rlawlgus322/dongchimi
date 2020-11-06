package com.dcm.boast.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.dcm.boast.service.FileService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dcm.boast.intercomm.UserClient;
import com.dcm.boast.model.Boast;
import com.dcm.boast.model.BoastDetailResponse;
import com.dcm.boast.model.BoastResponse;
import com.dcm.boast.model.BoastStar;
import com.dcm.boast.service.BoastService;

import io.swagger.annotations.ApiOperation;
import org.springframework.web.multipart.MultipartFile;

//http://localhost:8083/swagger-ui.html
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class BoastController {
	@Autowired
	private BoastService boastService;
	@Autowired
    private UserClient userClient;
	@Autowired
	private FileService fileService;

	@GetMapping("/all")
	@ApiOperation(value = "모든 자랑게시물 반환")
	public ResponseEntity<List<BoastResponse>> findAll(@PageableDefault(size=10, sort="createdate",direction = Sort.Direction.DESC)Pageable pageable) {
		
		Page<Boast> boastlist = boastService.allBoasts(pageable);
		List<BoastResponse> list = new ArrayList<>();
		Map<String, Object>map = new HashMap<>();
		for (Boast bst : boastlist) {
			map = userClient.getUsername(bst.getUserId());
			BoastResponse boastResponse = new BoastResponse(bst, (String)map.get("nickname"), false);
			if(boastService.isLike(bst.getBid())) boastResponse.setLiked(true); //내가 좋아요 누른 게시물인지
			list.add(boastResponse);
		}
		if(list != null) return new ResponseEntity<List<BoastResponse>>(list, HttpStatus.OK);
		else	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@PostMapping("/")
	@ApiOperation(value = "자랑게시물 작성")
	public ResponseEntity<?> insert(@RequestBody Boast boast, @RequestHeader("accessToken") String access) {

		ResponseEntity<?> entity = null;

		try {
			Map<String, Object>map = userClient.getUserInfo(access);
			entity = new ResponseEntity<Boast>(boastService.insert(boast), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
	@PutMapping("/b/{boastId}")
	@ApiOperation(value = "수정하기")
	public ResponseEntity<?> update(@PathVariable long boastId, @RequestBody Boast boast, @RequestHeader("accessToken") String access) {

		ResponseEntity<?> entity = null;

		try {
			Map<String, Object>map = userClient.getUserInfo(access);
			entity = new ResponseEntity<Boast>(boastService.update(boast,boastId), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return entity;
	}
	

	@GetMapping("/b/{boastId}")
	@ApiOperation(value = "해당 id값 게시물 가져오기")
	public ResponseEntity<BoastDetailResponse> find(@PathVariable long boastId, @RequestHeader("accessToken") String access) {
		ResponseEntity<BoastDetailResponse> entity = null;

		try {
			Boast bst = boastService.findBoastById(boastId);
			boastService.view(boastId); // 상세보기 누르면 조회수도같이 올리기
			Map<String, Object> map = userClient.getUsername(bst.getUserId());
			String nickname = (String) map.get("nickname");
			BoastDetailResponse boastDetailResponse = new BoastDetailResponse(bst,nickname,false);

			
			if(boastService.isLike(bst.getBid())) boastDetailResponse.setLiked(true); //내가 좋아요 누른 게시물인지
			entity = new ResponseEntity<BoastDetailResponse>(boastDetailResponse, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return entity;
//        List<Transaction> transactions = courseService.findTransactionsOfCourse(courseId);
//        if(CollectionUtils.isEmpty(transactions)){
//           return ResponseEntity.notFound().build();
//        }
//        List<long> userIdList = transactions.parallelStream().map(t -> t.getUserId()).collect(Collectors.toList());
//        List<String> students = userClient.getUserNames(userIdList);
	}
	@DeleteMapping("/b/{boastId}")
	@ApiOperation(value = "해당 id값 삭제")
	public ResponseEntity<?> delete(@PathVariable long boastId, @RequestHeader("accessToken") String access) {
		Map<String, Object>map = userClient.getUserInfo(access);
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
	
	@PutMapping("/like")
	@ApiOperation(value = "좋아요 올리기")
	public ResponseEntity<?> like(@RequestBody BoastStar boastStar, @RequestHeader("accessToken") String access) {

		ResponseEntity<?> entity = null;

		try {
			Map<String, Object>map = userClient.getUserInfo(access);
			entity = new ResponseEntity<Boast>(boastService.like(boastStar), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
	
	@PutMapping("/dislike")
	@ApiOperation(value = "좋아요 취소")
	public ResponseEntity<?> dislike(@RequestBody BoastStar boastStar, @RequestHeader("accessToken") String access) {

		ResponseEntity<?> entity = null;

		try {
			Map<String, Object>map = userClient.getUserInfo(access);
			entity = new ResponseEntity<Boast>(boastService.dislike(boastStar), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/image", produces = "application/json")
    @ApiOperation(value = "이미지 업로드")
    @ApiResponses({
            @ApiResponse(code = 201, message = "이미지 업로드 성공"),
            @ApiResponse(code = 400, message = "잘못된 요청입니다"),
            @ApiResponse(code = 401, message = "로그인 후 이용해 주세요"),
            @ApiResponse(code = 403, message = "권한이 없습니다"),
            @ApiResponse(code = 404, message = "이미지 업로드 실패")
    })
    private ResponseEntity<?> create(@RequestParam(value = "file") MultipartFile image, @RequestHeader("accessToken") String access) {
        ResponseEntity<?> entity = null;
        try {
            String path = fileService.image(image);
            entity = new ResponseEntity<>(fileService.image(image), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return entity;
    }
}
