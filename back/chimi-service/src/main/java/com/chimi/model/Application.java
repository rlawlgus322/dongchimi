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
    private PKSet applicationPK;
    
    @CreationTimestamp
    private LocalDateTime createdate;
    
    public Application(PKSet applicationPK){
        this.applicationPK = applicationPK;
    }
}
