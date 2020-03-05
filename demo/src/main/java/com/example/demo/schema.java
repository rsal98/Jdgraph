package com.example.demo;

public class schema {
	private String predicate;
	private String attrtype;
	private Boolean list;
	private Boolean count;
	private Boolean index;
	private Boolean upsert;
	private Boolean reverse;
	private String daytimevalue;
	private Boolean lang;
	private String stringindexval;
	private Boolean fulltext;
	private Boolean trigram;
	
	public String getPredicate() {
		return predicate;
	}
	public void setPredicate(String predicate) {
		this.predicate = predicate;
	}
	public String getAttrtype() {
		return attrtype;
	}
	public void setAttrtype(String attrtype) {
		this.attrtype = attrtype;
	}
	public Boolean getList() {
		return list;
	}
	public void setList(Boolean list) {
		this.list = list;
	}
	public Boolean getCount() {
		return count;
	}
	public void setCount(Boolean count) {
		this.count = count;
	}
	public Boolean getIndex() {
		return index;
	}
	public void setIndex(Boolean index) {
		this.index = index;
	}
	public Boolean getUpsert() {
		return upsert;
	}
	public void setUpsert(Boolean upsert) {
		this.upsert = upsert;
	}
	public Boolean getReverse() {
		return reverse;
	}
	public void setReverse(Boolean reverse) {
		this.reverse = reverse;
	}
	public String getDaytimevalue() {
		return daytimevalue;
	}
	public void setDaytimevalue(String daytimevalue) {
		this.daytimevalue = daytimevalue;
	}
	public Boolean getLang() {
		return lang;
	}
	public void setLang(Boolean lang) {
		this.lang = lang;
	}
	public String getStringindexval() {
		return stringindexval;
	}
	public void setStringindexval(String stringindexval) {
		this.stringindexval = stringindexval;
	}
	public Boolean getFulltext() {
		return fulltext;
	}
	public void setFulltext(Boolean fulltext) {
		this.fulltext = fulltext;
	}
	public Boolean getTrigram() {
		return trigram;
	}
	public void setTrigram(Boolean trigram) {
		this.trigram = trigram;
	}

}
