package com.example.demo;

public class userCred {
    private String userid;
    private String password;
    
	public userCred(String userid, String password) {
		super();
		this.userid = userid;
		this.password = password;
	}
	
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
    
    
}
