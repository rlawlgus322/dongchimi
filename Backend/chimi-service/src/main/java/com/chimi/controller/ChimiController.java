package com.chimi.controller;

import com.chimi.payload.response.ChimiSearchResponse;
import com.chimi.service.FileService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.chimi.intercomm.UserClient;
import com.chimi.model.Chimi;
import com.chimi.model.PKSet;
import com.chimi.model.ChimiStar;
import com.chimi.payload.response.ChimiDetailResponse;
import com.chimi.payload.response.ChimiResponse;
import com.chimi.service.ApplicationService;
import com.chimi.service.ChimiService;
import com.chimi.service.StarService;
import com.chimi.service.StorageService;

import io.swagger.annotations.ApiOperation;
import org.springframework.web.multipart.MultipartFile;

//http://localhost:8080/swagger-ui.html
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/chimi")
public class ChimiController {
	@Autowired
	ChimiService chimiService;
	@Autowired
	StarService starService;	
	@Autowired
	ApplicationService applicationService;
	@Autowired
	FileService fileService;
	@Autowired
    UserClient userClient;
	@Autowired
	StorageService storageService;
	
	@PostMapping
	@ApiOperation(value = "새 파티 게시 ")
	public ResponseEntity<String> insert(@RequestHeader("accessToken") String access,@RequestBody Chimi chimi) {
		HashMap<String,Object> userinfo = userClient.getUserInfo(access);

		if(chimi != null && userinfo!=null)	{
			long id = Long.parseLong(String.valueOf(userinfo.get("id")));
			System.out.println("id : " + id);
			chimi.setUserId(id);//user id 저장
			chimi.setIsstart(false);
			String url = UUID.randomUUID().toString();
			chimi.setRtcurl(url);
			chimiService.save(chimi);
			return new ResponseEntity<>("success", HttpStatus.OK);
		}
		else	return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping
	@ApiOperation(value = "파티 수정")
	public ResponseEntity<String> update(@RequestHeader("accessToken") String access,@RequestBody Chimi chimi) {
		HashMap<String,Object> userinfo = userClient.getUserInfo(access);
		if(userinfo==null) return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST); //이용자 못가져옴
		Chimi newChimi = chimiService.findById(chimi.getHid()).get();
		if(newChimi != null) {
			newChimi.setName(chimi.getName());
			newChimi.setSummary(chimi.getSummary());
			newChimi.setDescription(chimi.getDescription());
			newChimi.setStartdate(chimi.getStartdate());
			newChimi.setIsstart(chimi.isIsstart());
			newChimi = chimiService.save(newChimi);
		}
		if(newChimi != null)	return new ResponseEntity<>("success", HttpStatus.OK);
		else	return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping
	@ApiOperation(value = "모든 파티 조회[페이징]")	// ?page=0&size=20&sort=hid,asc
	public ResponseEntity<ChimiSearchResponse> searchAll(@PageableDefault(size=10, sort="createdate",direction = Sort.Direction.DESC)Pageable pageable, @RequestParam(value = "category",required=false) String category, @RequestParam(value = "name", required=false) String name){
		try {
			int cnt = 0;
			List<ChimiResponse> chimiList = new ArrayList<ChimiResponse> ();
			if(category == null && name == null){
				chimiService.updatechimiIsStart();
				Page<Chimi> chimiPage = chimiService.findAll(pageable);
				cnt = chimiService.countAll();
				for(Chimi chimi : chimiPage){
					HashMap<String,Object> cuserinfo = userClient.getusername(chimi.getUserId());
					chimiList.add(
							new ChimiResponse(chimi,
									String.valueOf(cuserinfo.get("nickname")),
									String.valueOf(cuserinfo.get("profileImage"))
							)
					);
				}

			}else if(category == null && name != null){
				System.out.println("=====================================================================================");
				System.out.println("name " + name);
				Page<Chimi> chimiPage = chimiService.findbyName(name, pageable);
				cnt = chimiService.countName(name);
				for(Chimi chimi : chimiPage){
					HashMap<String,Object> cuserinfo = userClient.getusername(chimi.getUserId());
					chimiList.add(
							new ChimiResponse(chimi,
									String.valueOf(cuserinfo.get("nickname")),
									String.valueOf(cuserinfo.get("profileImage"))
							)
					);
				}
			}else if(category != null && name == null){
				System.out.println("=====================================================================================");
				System.out.println("category "+ category);
				Page<Chimi> chimiPage = chimiService.findbyCategory(category,pageable);
				cnt = chimiService.countCategory(category);
				for(Chimi chimi : chimiPage){
					HashMap<String,Object> cuserinfo = userClient.getusername(chimi.getUserId());
					chimiList.add(
							new ChimiResponse(chimi,
									String.valueOf(cuserinfo.get("nickname")),
									String.valueOf(cuserinfo.get("profileImage"))
							)
					);
				}
			} else{
				System.out.println("=====================================================================================");
				System.out.println("category "+ category + " name " + name);
				Page<Chimi> chimiPage = chimiService.findbyCategoryAndName(category,name,pageable);
				cnt = chimiService.countNameAndCategory(name, category);
				for(Chimi chimi : chimiPage){
					HashMap<String,Object> cuserinfo = userClient.getusername(chimi.getUserId());
					chimiList.add(
							new ChimiResponse(chimi,
									String.valueOf(cuserinfo.get("nickname")),
									String.valueOf(cuserinfo.get("profileImage"))
							)
					);
				}
			}

			ChimiSearchResponse chimiSearchResponse = new ChimiSearchResponse();
			chimiSearchResponse.setChimiResponse(chimiList);
			chimiSearchResponse.setCnt(cnt);
			return new ResponseEntity<ChimiSearchResponse>(chimiSearchResponse, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@GetMapping("/{hid}")
	@ApiOperation(value = "파티 상세조회")
	public ResponseEntity<ChimiDetailResponse> search(@RequestHeader("accessToken") String access,@PathVariable long hid){
		Chimi newChimi = chimiService.findById(hid).get();
		HashMap<String, Object> loginUserinfo = null;
		if(!access.equals("null")) loginUserinfo = userClient.getUserInfo(access);
		HashMap<String,Object> chimiUserinfo = userClient.getusername(newChimi.getUserId());
		// 조회수 증가
		newChimi.setViews(newChimi.getViews()+1);
		newChimi = chimiService.save(newChimi);
		ChimiDetailResponse chimiResponse = null;
		if(loginUserinfo == null) { //로그인안되어있는  유저
			chimiResponse = new ChimiDetailResponse(
					newChimi,
					String.valueOf(chimiUserinfo.get("nickname")),
					String.valueOf(chimiUserinfo.get("profileImage"))
					);
		}
		else {
			long id = Long.parseLong(String.valueOf(loginUserinfo.get("id")));
			chimiResponse = new ChimiDetailResponse(
					newChimi,
					String.valueOf(chimiUserinfo.get("nickname")),
					String.valueOf(chimiUserinfo.get("profileImage")),
					starService.findById(new PKSet(id, newChimi.getHid())).isPresent(),
					storageService.findById(new PKSet(id, newChimi.getHid())).isPresent(),
					applicationService.findById(new PKSet(id, newChimi.getHid())).isPresent()
					);
		}
		
		if(newChimi != null)	return new ResponseEntity<>(chimiResponse, HttpStatus.OK);
		else	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/{hid}")
	@ApiOperation(value = "파티 삭제")
	public ResponseEntity<String> delete(@RequestHeader("accessToken") String access,@PathVariable long hid) {
		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		Chimi chimi = chimiService.findById(hid).get();
		if(chimi!=null && userinfo!=null && chimi.getUserId()==Long.parseLong(String.valueOf(userinfo.get("id"))) ){ //해당 취미가개설되어 있고 id가 일치하는지
			chimiService.deleteById(hid);
			// 추천 목록 삭제
			if(!starService.findByStarPKId(hid).isEmpty()){
				starService.deleteByStarPKId(hid);
			}
			return new ResponseEntity<>("success", HttpStatus.OK);
		} else{
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/myParty")
	@ApiOperation(value = "내가 등록한 파티 조회")
	public ResponseEntity<Page<Chimi>> searchWhichIRegister(@PageableDefault(size=10, sort="createdate",direction = Sort.Direction.DESC)Pageable pageable,
			@RequestHeader("accessToken") String access){

		try {
			HashMap<String, Object> loginUserinfo =  userClient.getUserInfo(access);
			long id = Long.parseLong(String.valueOf(loginUserinfo.get("id")));
			
			Page<Chimi> list = chimiService.findByUserId(id,pageable);
			
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
	}

	@PutMapping("/recommend/{hid}")
	@ApiOperation(value = "추천하기")
	public ResponseEntity<String> recommend(@RequestHeader("accessToken") String access,@PathVariable long hid) {
		Chimi newChimi  = chimiService.findById(hid).get();
		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		if(newChimi != null){
			newChimi.setStars(newChimi.getStars()+1);
			chimiService.save(newChimi);

			ChimiStar star = new ChimiStar(new PKSet(Long.parseLong(String.valueOf(userinfo.get("id"))), hid));
			starService.save(star);
			return new ResponseEntity<>("success", HttpStatus.OK);
		
		} else{
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/unrecommend/{hid}")
	@ApiOperation(value = "추천취소하기")
	public ResponseEntity<String> unrecommend(@RequestHeader("accessToken") String access,@PathVariable long hid) {
		Chimi newChimi  = chimiService.findById(hid).get();
		HashMap<String, Object> userinfo = userClient.getUserInfo(access);
		if(newChimi != null){
			newChimi.setStars(newChimi.getStars()>0? newChimi.getStars()-1 : 0);
			chimiService.save(newChimi);

			PKSet pk = new PKSet(Long.parseLong(String.valueOf(userinfo.get("id"))),hid);
			if(starService.findById(pk).isPresent()){
				starService.deleteById(pk);
			}
			
			return new ResponseEntity<>("success", HttpStatus.OK);
		} else{
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/search")
	@ApiOperation(value = "파티이름검색")
	public ResponseEntity<List<Chimi>> searchWhichpartyname(@RequestParam(value = "name") String name){

		try {
			return new ResponseEntity<>(chimiService.getChimisByName(name), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

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
	private ResponseEntity<?> create(@RequestParam(value = "file") MultipartFile image) {
		ResponseEntity<?> entity = null;
		try {
			entity = new ResponseEntity<>(fileService.image(image), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return entity;
	}





}
