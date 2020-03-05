package com.example.demo;

public class user {
	private String userid;
	private String pass;
	private String repass;
	
	public user() {
		
	}
	public user(String userid, String pass, String repass) {
		super();
		this.userid = userid;
		this.pass = pass;
		this.repass = repass;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getRepass() {
		return repass;
	}
	public void setRepass(String repass) {
		this.repass = repass;
	}
	
	
}
