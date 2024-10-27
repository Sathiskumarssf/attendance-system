package com.attendance_system.sever;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.context.WebServerInitializedEvent;
import org.springframework.context.ApplicationListener;

@SpringBootApplication
public class SeverApplication implements ApplicationListener<WebServerInitializedEvent> {

	private int serverPort;

	public static void main(String[] args) {
		SpringApplication.run(SeverApplication.class, args);
	}

	@Override
	public void onApplicationEvent(WebServerInitializedEvent event) {
		this.serverPort = event.getWebServer().getPort();
		System.out.println("Backend is running on port: " + this.serverPort);
		System.out.println("isnmks");
	}
}