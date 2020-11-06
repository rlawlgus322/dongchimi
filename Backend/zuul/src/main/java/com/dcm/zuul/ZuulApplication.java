package com.dcm.zuul;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
@EnableZuulProxy
public class ZuulApplication {

//	@Bean
//	 public WebMvcConfigurer corsConfigurer () {
//	     return  new WebMvcConfigurer () {
//	         public  void addCorsMappings (CorsRegistry registry) {
//	            registry.addMapping ( "/**" )
//	                    .allowedOrigins ( "*" )
//	                    .allowedHeaders( "*" )
//	                    .allowedMethods ( "GET" , "POST", "DELETE", "PUT" );
//	        }
//	    };
//	}

	public static void main(String[] args) {
		SpringApplication.run(ZuulApplication.class, args);
	}

}
