package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

@EnableScheduling
@Controller
public class WebSocketController {
	
	private String myMessage;
	
	@Autowired
    private SimpMessagingTemplate template;
	
	public void send1(String message) throws Exception {
		this.myMessage=message;
		send();
	}
	
	public void send() throws Exception {
		Thread.sleep(10);
		this.template.convertAndSend("/topic/messages",this.myMessage);
	}
	
}
