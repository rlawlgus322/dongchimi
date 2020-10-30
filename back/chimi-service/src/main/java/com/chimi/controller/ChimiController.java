package com.chimi.controller;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import com.chimi.model.Application;
import com.chimi.model.Chimi;
import com.chimi.model.PKSet;
import com.chimi.model.Star;
import com.chimi.model.Storage;
import com.chimi.payload.response.ChimiList;
import com.chimi.service.ApplicationService;
import com.chimi.service.ChimiService;
import com.chimi.service.StarService;
import com.chimi.service.StorageService;

import io.swagger.annotations.ApiOperation;

//http://localhost:8080/swagger-ui.html
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/chimi")
public class ChimiController {
	@Autowired
	ChimiService chimiService;
	@Autowired
	StorageService storageService;
	@Autowired
	StarService starService;
	@Autowired
	ApplicationService applicationService;

	@PostMapping
	@ApiOperation(value = "새 파티 게시 ")
	public ResponseEntity<String> insert(@RequestBody Chimi chimi) {
		Chimi newChimi = chimiService.save(chimi);	// 취미 파티 저장
		if(newChimi != null)	return new ResponseEntity<>("success", HttpStatus.OK);
		else									return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping
	@ApiOperation(value = "파티 수정")
	public ResponseEntity<String> update(@RequestBody Chimi chimi) {
		Chimi newChimi = chimiService.findById(chimi.getHid()).get();
		if(newChimi != null) {
			newChimi.setName(chimi.getName());
			newChimi.setSummary(chimi.getSummary());
			newChimi.setDescription(chimi.getDescription());
			newChimi = chimiService.save(newChimi);
		}
		if(newChimi != null)	return new ResponseEntity<>("success", HttpStatus.OK);
		else									return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping
	@ApiOperation(value = "모든 파티 조회[페이징]")	// ?page=0&size=20&sort=hid,asc
	public ResponseEntity<List<ChimiList>> searchAll(@PageableDefault(size=10, sort="createdate",direction = Sort.Direction.DESC)Pageable pageable, String email){
		
		Page<Chimi> chimiPage = chimiService.findAll(pageable);
		List<ChimiList> chimiList = new ArrayList<ChimiList> ();
		for(Chimi chimi : chimiPage){
			chimiList.add(new ChimiList(chimi, starService.findById(new PKSet(email, chimi.getHid())).isPresent()));
		}
		if(!chimiList.isEmpty())		return new ResponseEntity<>(chimiList, HttpStatus.OK);
		else												return new ResponseEntity<>(chimiList, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/{hid}")
	@ApiOperation(value = "파티 상세조회")
	public ResponseEntity<Chimi> search(@PathVariable Long hid){
		Chimi newChimi = chimiService.findById(hid).get();

		// 조회수 증가
		newChimi.setViews(newChimi.getViews()+1);
		newChimi = chimiService.save(newChimi);
		
		if(newChimi != null)	return new ResponseEntity<>(newChimi, HttpStatus.OK);
		else									return new ResponseEntity<>(newChimi, HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping
	@ApiOperation(value = "파티 삭제")
	public ResponseEntity<String> delete(Long hid) {

		if(chimiService.findById(hid).isPresent()){
			chimiService.deleteById(hid);
			// 추천 목록 삭제
			if(!starService.findByStarPKHid(hid).isEmpty()){
				starService.deleteByStarPKHid(hid);
			}
			return new ResponseEntity<>("success", HttpStatus.OK);
		} else{
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/recommend")
	@ApiOperation(value = "추천하기")
	public ResponseEntity<String> recommend(@RequestParam(required = true) Long hid, @RequestParam(required = true) String email) {
		Chimi newChimi  = chimiService.findById(hid).get();

		if(newChimi != null){
			newChimi.setStars(newChimi.getStars()+1);
			chimiService.save(newChimi);

			Star star = new Star(new PKSet(email, hid));
			starService.save(star);
			return new ResponseEntity<>("success", HttpStatus.OK);
		
		} else{
			return new ResponseEntity<>("fail", HttpStatus.FORBIDDEN);
		}
	}
	@PutMapping("/unrecommend")
	@ApiOperation(value = "추천취소하기")
	public ResponseEntity<String> unrecommend(@RequestParam(required = true) Long hid, @RequestParam(required = true) String email) {
		Chimi newChimi  = chimiService.findById(hid).get();

		if(newChimi != null){
			newChimi.setStars(newChimi.getStars()>0? newChimi.getStars()-1 : 0);
			chimiService.save(newChimi);

			PKSet pk = new PKSet(email,hid);
			if(starService.findById(pk).isPresent()){
				starService.deleteById(pk);
			}
			
			return new ResponseEntity<>("success", HttpStatus.OK);
		} else{
			return new ResponseEntity<>("fail", HttpStatus.FORBIDDEN);
		}
	}

	@PostMapping("/storage")
	@ApiOperation(value = "보관함에 저장")
	public ResponseEntity<String> insertStorage(String email, Long hid) {
		Storage newStorage = new Storage(new PKSet(email, hid));
		newStorage = storageService.save(newStorage);

		if(newStorage != null)	return new ResponseEntity<>("success", HttpStatus.OK);
		else										return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/storage")
	@ApiOperation(value = "사용자의 보관함 조회")
	public ResponseEntity<List<Storage>> searchStorage(String email) {
		
		List<Storage> list = storageService.findByStoragePKEmail(email);

		if(list != null){
			return new ResponseEntity<>(list, HttpStatus.OK);
		} else{
			return new ResponseEntity<>(list, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/storage")
	@ApiOperation(value = "보관함 삭제")
	public ResponseEntity<String> deleteStorage(String email, Long hid) {
		PKSet pk = new PKSet(email, hid);

		if(storageService.findById(pk).isPresent()){
			storageService.deleteById(pk);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} else{
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/apply")
	@ApiOperation(value = "파티 신청")
	public ResponseEntity<String> apply(String email, Long hid) {
		Application newApplication = new Application(new PKSet(email, hid));
		newApplication = applicationService.save(newApplication);

		if(newApplication != null)	return new ResponseEntity<>("success", HttpStatus.OK);
		else												return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/apply")
	@ApiOperation(value = "파티 신청 취소")
	public ResponseEntity<String> disapply(String email, Long hid) {
		PKSet pk = new PKSet(email, hid);

		if(applicationService.findById(pk).isPresent()){
			applicationService.deleteById(pk);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} else{
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
		}}
}
