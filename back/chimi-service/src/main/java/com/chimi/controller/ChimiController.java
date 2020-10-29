package com.chimi.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.chimi.model.Chimi;
import com.chimi.model.PKSet;
import com.chimi.model.Storage;
import com.chimi.service.ChimiService;
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

	@PostMapping
	@ApiOperation(value = "새 취미 파티 게시 ")
	public ResponseEntity<String> insert(@RequestBody Chimi chimi) {
		Chimi newChimi = chimiService.save(chimi);	// 취미 파티 저장
		if(newChimi != null)	return new ResponseEntity<>("success", HttpStatus.OK);
		else					return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping
	@ApiOperation(value = "취미 파티 수정")
	public ResponseEntity<String> update(@RequestBody Chimi chimi) {
		Chimi newChimi = chimiService.findById(chimi.getHid()).get();
		if(newChimi != null) {
			newChimi.setName(chimi.getName());
			newChimi.setSummary(chimi.getSummary());
			newChimi.setDescription(chimi.getDescription());
			newChimi = chimiService.save(newChimi);
		}
		if(newChimi != null)	return new ResponseEntity<>("success", HttpStatus.OK);
		else					return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping
	@ApiOperation(value = "모든 취미 파티 조회[페이징]")	// ?page=0&size=20&sort=hid,asc
	public ResponseEntity<Page<Chimi>> searchAll(@PageableDefault(size=10, sort="createdate",direction = Sort.Direction.DESC)Pageable pageable){
		
		Page<Chimi> list = chimiService.findAll(pageable);
	
		if(list != null)		return new ResponseEntity<>(list, HttpStatus.OK);
		else					return new ResponseEntity<>(list, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/{hid}")
	@ApiOperation(value = "취미 파티 상세조회")
	public ResponseEntity<Chimi> search(@PathVariable Long hid){
		Chimi newChimi = chimiService.findById(hid).get();

		// 조회수 증가
		newChimi.setViews(newChimi.getViews()+1);
		newChimi = chimiService.save(newChimi);
		
		if(newChimi != null)	return new ResponseEntity<>(newChimi, HttpStatus.OK);
		else					return new ResponseEntity<>(newChimi, HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping
	@ApiOperation(value = "취미 파티 삭제")
	public ResponseEntity<String> delete(Long hid) {

		if(chimiService.findById(hid)!= null){
			chimiService.deleteById(hid);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} else{
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
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
	@ApiOperation(value = "보관함 상세조회")
	public ResponseEntity<Storage> searchStorage(String email, Long hid) {
		PKSet pk = new PKSet(email, hid);
		Storage newStorage = storageService.findById(pk).get();

		if(newStorage != null){
			return new ResponseEntity<>(newStorage, HttpStatus.OK);
		} else{
			return new ResponseEntity<>(newStorage, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/storage")
	@ApiOperation(value = "보관함 삭제")
	public ResponseEntity<String> deleteStorage(String email, Long hid) {
		PKSet pk = new PKSet(email, hid);

		if(storageService.findById(pk).get()!= null){
			storageService.deleteById(pk);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} else{
			return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
		}
	}
}
