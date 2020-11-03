package com.chimi.model;

import java.time.LocalDateTime;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "APPLICATION")
public class Application {
	@EmbeddedId
	private PKSet applicationPK; // 신청한 사람 id, 취미 id
	private long roomUserId; // 파티 연 방장 id
	@CreationTimestamp
	private LocalDateTime createdate;

	public Application(PKSet applicationPK, long roomUserId) {
		this.applicationPK = applicationPK;
		this.roomUserId = roomUserId;
	}
}
