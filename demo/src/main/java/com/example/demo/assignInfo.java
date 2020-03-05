package com.example.demo;

public class assignInfo {
	private String userId;
	private String groupId;
	
	public assignInfo() {
		
	}
	public assignInfo(String userId, String groupId) {
		super();
		this.userId = userId;
		this.groupId = groupId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	
	
}	
