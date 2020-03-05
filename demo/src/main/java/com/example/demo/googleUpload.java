package com.example.demo;

public class googleUpload {
	private String rdfLink;
	private String schemaLink;
	public googleUpload(String rdfLink, String schemaUpload) {
		super();
		this.rdfLink = rdfLink;
		this.schemaLink = schemaUpload;
	}
	public String getRdfLink() {
		return rdfLink;
	}
	public void setRdfLink(String rdfLink) {
		this.rdfLink = rdfLink;
	}
	public String getSchemaLink() {
		return schemaLink;
	}
	public void setSchemaUpload(String schemaUpload) {
		this.schemaLink = schemaUpload;
	}
	
	
}
