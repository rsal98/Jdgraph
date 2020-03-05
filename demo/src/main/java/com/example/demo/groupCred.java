package com.example.demo;

public class groupCred {
	private String groupId;
	private boolean readPermi;
	private boolean writePermi;
	private boolean modifyPermi;
	private String predName;
	
	public groupCred() {
		
	}
	
	public groupCred(String groupId, boolean readPermi, boolean writePermi, boolean modifyPermi, String predName) {
		super();
		this.groupId = groupId;
		this.readPermi = readPermi;
		this.writePermi = writePermi;
		this.modifyPermi = modifyPermi;
		this.predName = predName;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	public boolean isReadPermi() {
		return readPermi;
	}
	public void setReadPermi(boolean readPermi) {
		this.readPermi = readPermi;
	}
	public boolean isWritePermi() {
		return writePermi;
	}
	public void setWritePermi(boolean writePermi) {
		this.writePermi = writePermi;
	}
	public boolean isModifyPermi() {
		return modifyPermi;
	}
	public void setModifyPermi(boolean modifyPermi) {
		this.modifyPermi = modifyPermi;
	}
	public String getPredName() {
		return predName;
	}
	public void setPredName(String predName) {
		this.predName = predName;
	}
	
	
}
