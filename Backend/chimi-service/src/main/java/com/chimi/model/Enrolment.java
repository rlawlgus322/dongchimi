package com.chimi.model;

import java.time.LocalDateTime;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
// 파티 신청 허가
@Table(name = "ENROLMENT")
public class Enrolment {
	@EmbeddedId
	private PKSet enrolmentPK;
	private long roomUserId; // 파티 연 방장 id
	@CreationTimestamp
	private LocalDateTime createdate;

	public Enrolment(PKSet enrolmentPK, long id) {
		this.enrolmentPK = enrolmentPK;
		this.roomUserId = id;
	}
}
