package com.dcm.boast.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dcm.boast.intercomm.UserClient;
import com.dcm.boast.model.Comment;
import com.dcm.boast.model.CommentResponse;
import com.dcm.boast.model.CommentStar;
import com.dcm.boast.model.PKSet;
import com.dcm.boast.service.CommentService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/comment")
public class CommentController {
	@Autowired
	private CommentService commentService;
	@Autowired
    private UserClient userClient;
	
	@GetMapping("/all/{boastId}")
	@ApiOperation(value = "해당 자랑게시물의 모든 댓글 반환")
	public ResponseEntity<List<CommentResponse>> findAll(@RequestHeader("accessToken") String access,
			@PathVariable long boastId, @PageableDefault(size=10, sort="createdate",direction = Sort.Direction.DESC)Pageable pageable) {
		try {
			HashMap<String, Object> loginUserinfo = null;
			if(!access.equals("null")) loginUserinfo = userClient.getUserInfo(access);
			
			Page<Comment> commentlist = commentService.allComments(boastId,pageable);
			List<CommentResponse> list = new ArrayList<>();
			for (Comment comment : commentlist) {
				Map<String, Object>map = userClient.getUsername(comment.getUserId());
				CommentResponse commentResponse = new CommentResponse(comment,String.valueOf(map.get("nickname")),
						String.valueOf(map.get("profileImage")));
				if(loginUserinfo!=null && commentService.isLike(comment.getId(),Long.parseLong(String.valueOf(loginUserinfo.get("id"))))) commentResponse.setIslike(true); //내가 좋아요 누른 댓글인지
				List<Comment> reclist = commentService.findReCommentById(comment.getId()); //대댓글 리스트
				commentResponse.setRecomment(reclist);
				list.add(commentResponse);
			}
			 return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}	
	}
	@PostMapping
	@ApiOperation(value = "자랑게시물 댓글작성")
	public ResponseEntity<?> insert(@RequestBody Comment comment, @RequestHeader("accessToken") String access) {

		ResponseEntity<?> entity = null;
		
		try {
			Map<String, Object>userinfo = userClient.getUserInfo(access);
			long id = Long.parseLong(String.valueOf(userinfo.get("id")));
			comment.setUserId(id);
			entity = new ResponseEntity<Comment>(commentService.insert(comment), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
	
	
	
	@PutMapping("/{commentId}")
	@ApiOperation(value = "수정하기")
	public ResponseEntity<?> update(@PathVariable long commentId, @RequestBody Comment comment, @RequestHeader("accessToken") String access) {

		ResponseEntity<?> entity = null;

		try {
			Comment cmt = commentService.findCommentById(comment.getId());
			Map<String, Object>userinfo = userClient.getUserInfo(access);
			long id = Long.parseLong(String.valueOf(userinfo.get("id")));
			cmt.setUserId(id);
			cmt.setContent(comment.getContent());
			entity = new ResponseEntity<Comment>(commentService.update(cmt,commentId), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return entity;
	}
	
	@DeleteMapping("/{commentId}")
	@ApiOperation(value = "해당 id값 삭제")
	public ResponseEntity<?> delete(@PathVariable long commentId, @RequestHeader("accessToken") String access) {
		Map<String, Object>userinfo = userClient.getUserInfo(access);
		long id = Long.parseLong(String.valueOf(userinfo.get("id")));
		Comment comment = commentService.findCommentById(commentId);
		if(comment != null && id==comment.getUserId()){
			commentService.delete(commentId);
			return new ResponseEntity<>(HttpStatus.OK);
		} else{
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

	}
	
	@PutMapping("/like/{cid}")
	@ApiOperation(value = "좋아요 올리기")
	public ResponseEntity<?> like(@PathVariable long cid, @RequestHeader("accessToken") String access) {

		ResponseEntity<?> entity = null;
		try {
			Map<String, Object>userinfo = userClient.getUserInfo(access);
			long id = Long.parseLong(String.valueOf(userinfo.get("id")));
			CommentStar commentStar = new CommentStar(new PKSet(id,cid));
			entity = new ResponseEntity<Comment>(commentService.like(commentStar), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
	
	@PutMapping("/dislike/{cid}")
	@ApiOperation(value = "좋아요 취소")
	public ResponseEntity<?> dislike(@PathVariable long cid, @RequestHeader("accessToken") String access) {

		ResponseEntity<?> entity = null;

		try {
			Map<String, Object>userinfo = userClient.getUserInfo(access);
			long id = Long.parseLong(String.valueOf(userinfo.get("id")));
			CommentStar commentStar = new CommentStar(new PKSet(id,cid));
			entity = new ResponseEntity<Comment>(commentService.dislike(commentStar), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
}
