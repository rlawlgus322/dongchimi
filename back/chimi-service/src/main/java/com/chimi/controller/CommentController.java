package com.chimi.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.chimi.model.ChimiComment;
import com.chimi.model.CommentLike;
import com.chimi.model.PKSet;
import com.chimi.payload.response.ChimiCommentList;
import com.chimi.service.CommentService;
import com.chimi.service.LikeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

// http://localhost:8081/swagger-ui.html
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/comment")
public class CommentController {

	@Autowired
    private CommentService commentService;
    @Autowired
    private LikeService likeService;

    @PostMapping
    @ApiOperation(value = "새 댓글 쓰기")
    public ResponseEntity<String> insert(@RequestBody ChimiComment comment) {
    
        ChimiComment newComment = commentService.save(comment);     // 댓글 저장

        if(newComment != null)	return new ResponseEntity<>("success", HttpStatus.OK);
		else					return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
    }

    @GetMapping
	@ApiOperation(value = "해당 파티의 모든 댓글 조회")
	public ResponseEntity<List<ChimiCommentList>> searchAll(@RequestParam(required = true) Long hid, @RequestParam(required = true) String email) throws Exception {
       
        List<ChimiComment> comments = commentService.findByHid(hid);
        List<ChimiCommentList> commentList = new ArrayList<>();
        for(ChimiComment comment : comments){
            commentList.add(new ChimiCommentList(comment, likeService.findById(new PKSet(email, comment.getCid())).isPresent()));
        }
        return new ResponseEntity<>(commentList, HttpStatus.OK);
    }
    
    @PutMapping
	@ApiOperation(value = "댓글 수정 ")
	public ResponseEntity<String> modifyComment(@RequestBody ChimiComment comment) {

        ChimiComment newComment = commentService.findById(comment.getCid()).get();
        if(newComment != null){
            newComment.setContent(comment.getContent());
            newComment = commentService.save(newComment);
        }
        if(newComment != null)  return new ResponseEntity<>("success", HttpStatus.OK);
		else					return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	
	}	

    @DeleteMapping
	@ApiOperation(value = "댓글 삭제")
	public ResponseEntity<String> deleteComment(Long cid) {

        if(commentService.findById(cid).isPresent()){
            commentService.deleteById(cid);

            if(!likeService.findByLikePKId(cid).isEmpty()){
                likeService.deleteByLikePKId(cid);
            }
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else{
            return new ResponseEntity<>("댓글이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/like")
	@ApiOperation(value = "댓글 좋아요")
	public ResponseEntity<String> like(@RequestParam(required = true) Long cid, @RequestParam(required = true) String email) {
        ChimiComment newComment = commentService.findById(cid).get();
        if(newComment != null){
            newComment.setLikes(newComment.getLikes()+1);
            commentService.save(newComment);

            CommentLike like = new CommentLike(new PKSet(email, cid));
            likeService.save(like);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else{
            return new ResponseEntity<>("댓글이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/dislike")
	@ApiOperation(value = "댓글 좋아요 취소")
	public ResponseEntity<String> dislike(@RequestParam(required = true) Long cid, @RequestParam(required = true) String email) {
        ChimiComment newComment = commentService.findById(cid).get();
        if(newComment != null){
            newComment.setLikes(newComment.getLikes()>0? newComment.getLikes()-1 : 0);
            commentService.save(newComment);

            PKSet pk = new PKSet(email,cid);
            if(likeService.findById(pk).isPresent()){
                likeService.deleteById(pk);
            }
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else{
            return new ResponseEntity<>("댓글이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
   
	}
	
}

