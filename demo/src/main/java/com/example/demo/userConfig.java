package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class userConfig {

	@Value("${project.vmId}")
	private String vmId;
	
	@Value("${project.vmPass}")
	private String vmPass;

	public String getVmId() {
		return vmId;
	}

	public void setVmId(String vmId) {
		this.vmId = vmId;
	}

	public String getVmPass() {
		return vmPass;
	}

	public void setVmPass(String vmPass) {
		this.vmPass = vmPass;
	}

	
}
