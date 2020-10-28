package com.chimi.service;

import java.util.Optional;

import com.chimi.model.Chimi;

public interface ChimiService {
	Chimi save(Chimi chimi);
	Optional<Chimi> findById(Long hid);
}
