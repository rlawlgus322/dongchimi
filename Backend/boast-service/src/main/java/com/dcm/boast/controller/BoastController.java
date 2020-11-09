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
import com.dcm.boast.model.PKSet;
import com.dcm.boast.service.BoastService;

import io.swagger.annotations.ApiOperation;
import org.springframework.web.multipart.MultipartFile;

//http://localhost:8083/swagger-ui.html
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
//@RequestMapping("/bst")
public class BoastController {
	@Autowired
	private BoastService boastService;
	@Autowired
    private UserClient userClient;
	@Autowired
	private FileService fileService;

	@GetMapping("/all")
	@ApiOperation(value = "모든 자랑게시물 반환")
	public ResponseEntity<List<BoastResponse>> findAll(@RequestHeader("accessToken") String access,
			@PageableDefault(size=10, sort="createdate",direction = Sort.Direction.DESC)Pageable pageable) {
		try {
			HashMap<String, Object> loginUserinfo = null;
			if(access!=null) loginUserinfo = userClient.getUserInfo(access);
			
			Page<Boast> boastlist = boastService.allBoasts(pageable);
			List<BoastResponse> list = new ArrayList<>();
			Map<String, Object>map = new HashMap<>();
			for (Boast bst : boastlist) {
				map = userClient.getUsername(bst.getUserId());
				BoastResponse boastResponse = new BoastResponse(bst, String.valueOf(map.get("nickname")),String.valueOf(map.get("profileImage")), false);
				if(loginUserinfo!=null) {
					long id = Long.parseLong(String.valueOf(loginUserinfo.get("id")));
					if(boastService.isLike(id,bst.getBid())) boastResponse.setLiked(true); //내가 좋아요 누른 게시물인지
				}
				list.add(boastResponse);
			}
			 return new ResponseEntity<List<BoastResponse>>(list, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		

	}

	@PostMapping
	@ApiOperation(value = "자랑게시물 작성")
	public ResponseEntity<?> insert(@RequestBody Boast boast, @RequestHeader("accessToken") String access) {

		ResponseEntity<?> entity = null;

		try {
			Map<String, Object>userinfo = userClient.getUserInfo(access);
			long id = Long.parseLong(String.valueOf(userinfo.get("id")));
			boast.setUserId(id);
			entity = new ResponseEntity<Boast>(boastService.insert(boast), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
	@PutMapping("/{boastId}")
	@ApiOperation(value = "수정하기")
	public ResponseEntity<?> update(@PathVariable long boastId, @RequestBody Boast boast, @RequestHeader("accessToken") String access) {

		ResponseEntity<?> entity = null;

		try {
			Boast bst = boastService.findBoastById(boastId);
			Map<String, Object>userinfo = userClient.getUserInfo(access);
			long id = Long.parseLong(String.valueOf(userinfo.get("id")));
			bst.setUserId(id);
			bst.setContents(boast.getContents());
			bst.setPostImg(boast.getPostImg());
			bst.setTitle(boast.getTitle());
			entity = new ResponseEntity<Boast>(boastService.update(bst,boastId), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return entity;
	}
	

	@GetMapping("/{boastId}")
	@ApiOperation(value = "해당 id값 게시물 가져오기")
	public ResponseEntity<BoastDetailResponse> find(@PathVariable long boastId, @RequestHeader("accessToken") String access) {
		ResponseEntity<BoastDetailResponse> entity = null;

		try {
			Boast bst = boastService.findBoastById(boastId);
			boastService.view(boastId); // 상세보기 누르면 조회수도같이 올리기
			
			//글 쓴 사람
			Map<String, Object> map = userClient.getUsername(bst.getUserId());
			String nickname = String.valueOf(map.get("nickname"));
			String profileImage = String.valueOf(map.get("profileImage"));
			BoastDetailResponse boastDetailResponse = new BoastDetailResponse(bst,nickname,profileImage,false);
			//보는 사람
			HashMap<String, Object> loginUserinfo = null;
			if(access!=null) loginUserinfo = userClient.getUserInfo(access);
			
			if(loginUserinfo!=null) { //로그인 된 사람이면 좋아요 유무 확인
				long id = Long.parseLong(String.valueOf(loginUserinfo.get("id")));
				if(boastService.isLike(id,bst.getBid())) boastDetailResponse.setLiked(true); //내가 좋아요 누른 게시물인지
			}
			entity = new ResponseEntity<BoastDetailResponse>(boastDetailResponse, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return entity;
	}
	@DeleteMapping("/{boastId}")
	@ApiOperation(value = "해당 id값 삭제")
	public ResponseEntity<?> delete(@PathVariable long boastId, @RequestHeader("accessToken") String access) {
		Map<String, Object>userinfo = userClient.getUserInfo(access);
		long id = Long.parseLong(String.valueOf(userinfo.get("id")));
		Boast boast = boastService.findBoastById(boastId);
		if(boast!= null && boast.getUserId()==id){
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
	
	@PutMapping("/like/{boastId}")
	@ApiOperation(value = "좋아요 올리기")
	public ResponseEntity<?> like(@PathVariable long boastId, @RequestHeader("accessToken") String access) {

		ResponseEntity<?> entity = null;
		try {
			Map<String, Object>userinfo = userClient.getUserInfo(access);
			long id = Long.parseLong(String.valueOf(userinfo.get("id")));
			BoastStar boastStar = new BoastStar(new PKSet(id,boastId));
			entity = new ResponseEntity<Boast>(boastService.like(boastStar), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
	
	@PutMapping("/dislike/{boastId}")
	@ApiOperation(value = "좋아요 취소")
	public ResponseEntity<?> dislike(@PathVariable long boastId, @RequestHeader("accessToken") String access) {

		ResponseEntity<?> entity = null;

		try {
			Map<String, Object>userinfo = userClient.getUserInfo(access);
			long id = Long.parseLong(String.valueOf(userinfo.get("id")));
			BoastStar boastStar = new BoastStar(new PKSet(id,boastId));
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
