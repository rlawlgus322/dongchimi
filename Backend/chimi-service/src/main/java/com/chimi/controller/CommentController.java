package com.chimi.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.chimi.intercomm.UserClient;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
    @Autowired
    private UserClient userClient;
    @PostMapping
    @ApiOperation(value = "새 댓글 쓰기")
    public ResponseEntity<String> insert(@RequestHeader("accessToken") String access,@RequestBody ChimiComment comment) {
    	HashMap<String, Object> userinfo = userClient.getUserInfo(access);
    	long id = Long.parseLong(String.valueOf(userinfo.get("id")));
    	comment.setUserId(id);
        ChimiComment newComment = commentService.save(comment);     // 댓글 저장

        if(newComment != null)	return new ResponseEntity<>("success", HttpStatus.OK);
		else					return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{hid}")
	@ApiOperation(value = "해당 파티의 모든 댓글 조회")
	public ResponseEntity<List<ChimiCommentList>> searchAll(@PathVariable long hid) throws Exception {
       
        List<ChimiComment> comments = commentService.findByHid(hid);
        List<ChimiCommentList> commentList = new ArrayList<>();
        for(ChimiComment comment : comments){
            commentList.add(new ChimiCommentList(comment, likeService.findById(new PKSet(comment.getUserId(), comment.getCid())).isPresent()));
        }
        return new ResponseEntity<>(commentList, HttpStatus.OK);
    }
    
    @PutMapping
	@ApiOperation(value = "댓글 수정 ")
	public ResponseEntity<String> modifyComment(@RequestHeader("accessToken") String access,@RequestBody ChimiComment comment) {
    	HashMap<String, Object> userinfo = userClient.getUserInfo(access);
        ChimiComment newComment = commentService.findById(comment.getCid()).get();
        if(newComment != null && newComment.getUserId()==(Long.parseLong(String.valueOf(userinfo.get("id"))))){
            newComment.setContent(comment.getContent());
            newComment = commentService.save(newComment);
        }
        if(newComment != null)  return new ResponseEntity<>("success", HttpStatus.OK);
		else					return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	
	}	

    @DeleteMapping("/{cid}")
	@ApiOperation(value = "댓글 삭제")
	public ResponseEntity<String> deleteComment(@RequestHeader("accessToken") String access,@PathVariable long cid) {
    	HashMap<String, Object> userinfo = userClient.getUserInfo(access);
        if(commentService.findById(cid).isPresent() && commentService.findById(cid).get().getUserId()==Long.parseLong(String.valueOf(userinfo.get("id")))){
            commentService.deleteById(cid);

            if(!likeService.findByLikePKId(cid).isEmpty()){
                likeService.deleteByLikePKId(cid);
            }
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else{
            return new ResponseEntity<>("댓글이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/like/{cid}")
	@ApiOperation(value = "댓글 좋아요")
	public ResponseEntity<String> like(@RequestHeader("accessToken") String access,@PathVariable long cid) {
    	HashMap<String, Object> userinfo = userClient.getUserInfo(access);
        ChimiComment newComment = commentService.findById(cid).get();
        if(newComment != null){
            newComment.setLikes(newComment.getLikes()+1);
            commentService.save(newComment);

            CommentLike like = new CommentLike(new PKSet(Long.parseLong(String.valueOf(userinfo.get("id"))), cid));
            likeService.save(like);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else{
            return new ResponseEntity<>("댓글이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/dislike/{cid}")
	@ApiOperation(value = "댓글 좋아요 취소")
	public ResponseEntity<String> dislike(@RequestHeader("accessToken") String access,@PathVariable long cid) {
    	HashMap<String, Object> userinfo = userClient.getUserInfo(access);
    	ChimiComment newComment = commentService.findById(cid).get();
        if(newComment != null){
            newComment.setLikes(newComment.getLikes()>0? newComment.getLikes()-1 : 0);
            commentService.save(newComment);

            PKSet pk = new PKSet(Long.parseLong(String.valueOf(userinfo.get("id"))),cid);
            if(likeService.findById(pk).isPresent()){
                likeService.deleteById(pk);
            }
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else{
            return new ResponseEntity<>("댓글이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
   
	}
	
}

