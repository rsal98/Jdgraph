package com.example.demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletionException;
import java.util.stream.Collectors;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.protobuf.ByteString;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import io.dgraph.DgraphClient;
import io.dgraph.DgraphGrpc;
import io.dgraph.Transaction;
import io.dgraph.DgraphGrpc.DgraphStub;
import io.dgraph.DgraphProto.Mutation;
import io.dgraph.DgraphProto.Operation;
import io.dgraph.DgraphProto.Request;
import io.dgraph.DgraphProto.Response;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

@RestController
@CrossOrigin
public class controller {
	
	private DgraphClient dgraphClient;
	private String ipAddr;
	private String adminPass;
	@Autowired
	private userConfig config;
	@Autowired
	private WebSocketController socket;
	
	public String runShellScript(String command) {
		
		String sline="";
		try {
		    Process process = Runtime.getRuntime().exec(command);
		 
		    BufferedReader reader = new BufferedReader(
		            new InputStreamReader(process.getInputStream()));
		    String line;
		    while ((line = reader.readLine()) != null) {
		    	System.out.println(line);
		        sline=line;
		    }
		    reader.close();
		 
		} catch (IOException e) {
		    e.printStackTrace();
		}
		return sline;
	}
	
	@PostMapping("/createConnection")
	public String createConnection(@RequestBody forConnection conn)
	{
		String result="";
		ManagedChannel channel = ManagedChannelBuilder
			    .forAddress(conn.getIp(), 9080)
			    .usePlaintext().build();
			DgraphStub stub = DgraphGrpc.newStub(channel);
			dgraphClient = new DgraphClient(stub);
			ipAddr=conn.getIp();
			try {
				dgraphClient.login("groot", "password");
				result="connected";
			}
			catch(CompletionException e) {
				System.out.println(e);
				result=e.toString();
			}
			return result;
	}
	@PostMapping("/check")
	public String checkCredentials(@RequestBody userCred user) throws UnirestException, JSONException
	{	
		adminPass=user.getPassword();
		try {
			dgraphClient.login(user.getUserid(), user.getPassword());
		}
		catch(Exception e) {
			System.out.println(e);
		}
		String command="{\"userid\":\""+user.getUserid()+"\", \"password\":\""+user.getPassword()+"\"}";
		HttpResponse<JsonNode> jsonResponse  = Unirest.post("http://"+this.ipAddr+":8080/login")
	      .body(command)
	      .asJson();
		JsonNode result=jsonResponse.getBody();	
		JSONObject temp=result.getObject();
		return temp.toString();
	}
	
	@GetMapping("/shutdown")
	public String aplhaShut() throws UnirestException {
		System.out.println(config.getVmId());
		String command="./bashFiles/makeFile.sh "+config.getVmId()+"@"+this.ipAddr+" "+config.getVmPass();
		String hmm=runShellScript(command);
		command="./bashFiles/forRun.sh "+config.getVmId()+"@"+this.ipAddr + " "+config.getVmPass();
		return runShellScript(command);
	}
	@PostMapping("/addUser")
	public String addNewUser(@RequestBody user newUser)
	{
		String command="./bashFiles/commands.sh "+newUser.getUserid()+" "+this.adminPass+" "+newUser.getPass()+" "+newUser.getRepass()+" "+this.ipAddr;
		String hmm=runShellScript(command);
		return hmm;
	}
	
public String runShellScriptUpload(String command) throws Exception {
		
		try {
		    Process process = Runtime.getRuntime().exec(command);
		 
		    BufferedReader reader = new BufferedReader(
		            new InputStreamReader(process.getInputStream()));
		    String line;
		    while ((line = reader.readLine()) != null) {
		    	socket.send1(line);
		    	System.out.println(line);
		    }
		    reader.close();
		 
		} catch (IOException e) {
		    e.printStackTrace();
		}
		return "done";
	}
	
	@PostMapping("/googleUpload")
	public String googleUpload(@RequestBody googleUpload links) throws Exception
	{
		String rdfId=links.getRdfLink().substring(links.getRdfLink().lastIndexOf("=")+1, links.getRdfLink().length());
		String schemaId=links.getSchemaLink().substring(links.getSchemaLink().lastIndexOf("=")+1, links.getSchemaLink().length());
		String command="./bashFiles/fileDownload.sh "+config.getVmId()+"@"+this.ipAddr+" "+config.getVmPass()+" rdfId";
		String hmm=runShellScriptUpload(command);
		command="./bashFiles/fileDownload1.sh rohit@"+this.ipAddr+" 123456 "+schemaId;
		hmm=runShellScriptUpload(command);
		command="./bashFiles/loader.sh rohit@"+this.ipAddr;
		hmm=runShellScriptUpload(command);
		command="./bashFiles/startAlpha.sh rohit@"+this.ipAddr;
		hmm=runShellScriptUpload(command);
		return hmm;
	}
	
	@PostMapping("/deleteUser")
	public String deleteUser(@RequestBody forDelete user)
	{
		String command="./bashFiles/forDelete.sh "+this.adminPass+" "+user.getUserid()+" "+this.ipAddr;
		return runShellScript(command);
	}
	
	@PostMapping("/User")
	public String showUser(@RequestBody forDelete user)
	{
		String command="./bashFiles/user.sh "+this.adminPass+" "+user.getUserid()+" "+this.ipAddr;
		String sline="";
		try {
		    Process process = Runtime.getRuntime().exec(command);
		 
		    BufferedReader reader = new BufferedReader(
		            new InputStreamReader(process.getInputStream()));
		    String line;
		    while ((line = reader.readLine()) != null) {
		    	sline=sline+line+"\n";
		    }
		    System.out.println(sline);
		    reader.close();
		 
		} catch (IOException e) {
		    e.printStackTrace();
		}
		return sline;
	}
	
	@PostMapping("/updateUser")
	public String updateUser(@RequestBody user updatePass)
	{
		String command="./bashFiles/forUpdate.sh "+updatePass.getUserid()+" "+this.adminPass+" "+updatePass.getPass()+" "+updatePass.getRepass()+" "+this.ipAddr;
		return runShellScript(command);
	}
	
	@PostMapping("/deleteGroup")
	public String deleteGroup(@RequestBody groupInfo group)
	{
		String command="./bashFiles/deleteGroup.sh "+group.getGroupId()+" "+this.adminPass+" "+this.ipAddr;
		return runShellScript(command);
	}
	
	@PostMapping("/usertogroup")
	public String assignUser(@RequestBody assignInfo user)
	{
		String command="./bashFiles/assignUser.sh "+user.getUserId()+" "+this.adminPass+" "+user.getGroupId()+" "+this.ipAddr;
		return runShellScript(command);
	}
	
	@PostMapping("/groupInfo")
	public String groupInfo(@RequestBody groupInfo group)
	{
		String command="./bashFiles/groupInfo.sh "+group.getGroupId()+" "+this.adminPass+" "+this.ipAddr;
		String sline="";
		try {
		    Process process = Runtime.getRuntime().exec(command);
		 
		    BufferedReader reader = new BufferedReader(
		            new InputStreamReader(process.getInputStream()));
		    String line;
		    while ((line = reader.readLine()) != null) {
		    	sline=sline+line+"\n";
		    }
		    reader.close();
		 
		} catch (IOException e) {
		    e.printStackTrace();
		}
		return sline;
	}
	
	@PostMapping("/addGroup")
	public String addGroup(@RequestBody groupCred group)
	{
		String command="./bashFiles/groupAdd.sh "+group.getGroupId()+" "+this.adminPass+" "+this.ipAddr;
		char[] permi=new char[3];
		if(group.isReadPermi())
			permi[0]='1';
		else
			permi[0]='0';
		
		if(group.isWritePermi())
			permi[1]='1';
		else
			permi[1]='0';
		
		if(group.isModifyPermi())
			permi[2]='1';
		else
			permi[2]='0';
		
		String permiStr=new String(permi);
		int decimal=Integer.parseInt(permiStr,2);  
		String str1 = Integer.toString(decimal); 
		String sline=runShellScript(command);
		if(sline.equals("group \""+group.getGroupId()+"\" already exists"))		{
			return sline;
		}
		else	{
			command="./bashFiles/givePermi.sh "+group.getGroupId()+" "+this.adminPass+" "+group.getPredName()+" "+str1+" "+this.ipAddr;
			System.out.println(command);
			try {
			    Process process = Runtime.getRuntime().exec(command);
			 
			    BufferedReader reader = new BufferedReader(
			            new InputStreamReader(process.getInputStream()));
			    reader.close();
			 
			} catch (IOException e) {
			    e.printStackTrace();
			}
			return "Group with the permissions Created Successfully";
		}
	}
	
	@PostMapping("/schema")
	  public String schema(@RequestBody schema schema[]) {
		  
		  String scma="";
		  
		  for(int i=0;i<schema.length;i++) {
			  
			  scma+=schema[i].getPredicate()+": ";
			
			  if(schema[i].getList()) {
				  scma+="["+schema[i].getAttrtype()+"] ";
			  }else {
				  scma+=schema[i].getAttrtype()+" ";
			  }
			  
			  if(schema[i].getIndex()) {
				  scma+="@index(";
				  if(schema[i].getAttrtype().equals("string")) {
					  if(schema[i].getStringindexval()!=null) {
						  scma+=schema[i].getStringindexval()+",";
					  }
					  if(schema[i].getFulltext()) {
						  scma+="fulltext,";
					  }
					  if(schema[i].getTrigram()) {
						  scma+="trigram";
					  }
				  }else if(schema[i].getAttrtype().equals("daytime") && schema[i].getDaytimevalue()!=null) {
					  scma+=schema[i].getDaytimevalue();
				  }else {
					  scma+=schema[i].getAttrtype();
				  }
				  
				  scma+=") ";
			  }
			  
			  if(schema[i].getCount()) {
				  scma+="@count ";
			  }
			  
			  if(schema[i].getUpsert()) {
				  scma+="@upsert ";
			  }
			  
			  if(schema[i].getLang()) {
				  scma+="@lang ";
			  }
			  
			  if(schema[i].getReverse()) {
				  scma+="@reverse ";
			  }
			  
			  scma+=".\n";
		  }
		  	Operation operation = Operation.newBuilder().setSchema(scma).build();
			this.dgraphClient.alter(operation);	
		  
		  return scma;
				
	  }
	@PostMapping("/type")
	  public String type(@RequestBody String abc) {
		  	//  System.out.println(abc);
		  	  
		  	String schema=schemapush();
			JSONObject jsonObj0 = new JSONObject(schema);
			
			 JSONArray arrObj = jsonObj0.getJSONArray("schema");
			 Map< String,String> hm =  new HashMap< String,String>();
			 for(int i=0;i<arrObj.length();i++) {
				 JSONObject temp=new JSONObject(arrObj.get(i).toString());
				 hm.put(temp.getString("predicate"), temp.getString("type"));
			 }
			 
		  	  
		  JSONObject jsonObj = new JSONObject(abc);  
		  Set<String> set = jsonObj.keySet()
            .stream()
            .filter(s -> s.startsWith("r"))
            .collect(Collectors.toSet());
		  String[] rvalues = new String[set.size()];
	      set.toArray(rvalues);
		      
		     String scma ="type "+jsonObj.get("typevalue")+" {\n";
		     for(int i=0;i<rvalues.length;i++) {
		    	 if(hm.get(rvalues[i].substring(1)).equals("uid") && jsonObj.get(rvalues[i]).toString()=="true") {
		    		 scma+=rvalues[i].substring(1)+": ["+jsonObj.get("u"+rvalues[i].substring(1))+"] \n";
		    	 }else if(!hm.get(rvalues[i].substring(1)).equals("uid") && jsonObj.get(rvalues[i]).toString()=="true") {
		    		 scma+=rvalues[i].substring(1)+": "+hm.get(rvalues[i].substring(1))+"\n";
		    	 }
		     }
		     scma+="}";
		 //    System.out.println(scma);
		     
		     Operation operation = Operation.newBuilder().setSchema(scma).build();
				this.dgraphClient.alter(operation);	
			  
			  return scma;
		      
	      }
	
	@RequestMapping("/schemapush")
	  public String schemapush() {
		String query ="schema{}";
		Response response = dgraphClient.newReadOnlyTransaction().query(query);
		//System.out.println(response.getJson().toStringUtf8());
		return response.getJson().toStringUtf8();
	}
	
	@RequestMapping("/edgequery")
	  public String edgequery() {
			String abc=schemapush();
			JSONObject jsonObj = new JSONObject(abc);
			 JSONArray arrObj = jsonObj.getJSONArray("schema");
			 Map< String,String> hm =  new HashMap< String,String>();
			 ArrayList<String> arrli = new ArrayList<>();
			 for(int i=0;i<arrObj.length();i++) {
				 JSONObject temp=new JSONObject(arrObj.get(i).toString());
				 if(temp.getString("predicate").length()<=5 || !temp.getString("predicate").substring(0,6).equals("dgraph")) {
				 hm.put(temp.getString("predicate"), temp.getString("type"));
				 arrli.add(temp.getString("predicate"));
				 }
			 }
			 
			String query="{\n "+"people(func: has(dgraph.type)) {\n "+"uid\n ";
			
			for(int i=0;i<arrli.size();i++) {
				if(!hm.get(arrli.get(i)).equals("uid")) {
					query+=arrli.get(i)+"\n";
				}
			}
			query+="}\n }";
			Response response = dgraphClient.newReadOnlyTransaction().query(query);
			return response.getJson().toStringUtf8();
	}
	
	@PostMapping("/mutation")
	  public String mutation(@RequestBody String abc) {
	
		JSONObject jsonObj = new JSONObject(abc);
		
		Set<String> set = jsonObj.keySet()
                .stream()
                .filter(s -> s.startsWith("0"))
                .collect(Collectors.toSet());
		  String[] rvalues = new String[set.size()];
	      set.toArray(rvalues);
	      
	      String muta="{";
	      for(int i=0;i<rvalues.length;i++) {
	    	  if(!jsonObj.get(rvalues[i]).equals("")) {
	    	  muta+="\""+rvalues[i].substring(1)+"\":\""+jsonObj.get(rvalues[i])+"\", \n";
	    	  }
	      }
	      int j=1;
	      while(jsonObj.has(j+rvalues[0].substring(1))) {
	    	  muta+="\"follows\": { \n";
	    	  for(int i=0;i<rvalues.length;i++) {
		    	  if(!jsonObj.get(j+rvalues[i].substring(1)).equals("")) {
		    	  muta+="\""+rvalues[i].substring(1)+"\":\""+jsonObj.get(j+rvalues[i].substring(1))+"\", \n";
		    	  }
		      }
	    	  j++;
	      }
	      
	      muta=muta.substring(0, muta.length()-3);
	      for(int i=0;i<j;i++) {
	    	  muta+="\n }";
	      }  
	      System.out.println(muta);
		 Transaction txn = dgraphClient.newTransaction();
		  Mutation mu =Mutation.newBuilder().setSetJson(ByteString.copyFromUtf8(muta.toString())).build();	  
		  		txn.mutate(mu);
				txn.commit();
				return muta;

	 }
	
	@PostMapping("/tmutation")
	  public String tmutation(@RequestBody String abc) {

		JSONObject jsonObj = new JSONObject(abc);
		
		Set<String> set = jsonObj.keySet()
              .stream()
              .filter(s -> s.startsWith("0"))
              .collect(Collectors.toSet());
		  String[] rvalues = new String[set.size()];
	      set.toArray(rvalues);
	      String muta="";
	      
	      int j=0;
	      while(jsonObj.has(j+rvalues[0].substring(1))) {
	    	  muta+="_:"+jsonObj.get(j+"typevalue")+j+" <dgraph.type> \""+jsonObj.get(j+"typevalue")+"\" .\n";
	    	   	  for(int i=0;i<rvalues.length;i++) {
	    	   		  if(!rvalues[i].substring(1).equals("typevalue")) {
		    	  if(!jsonObj.get(j+rvalues[i].substring(1)).equals("") && !Arrays.asList("0","1", "2", "3","4","5","6","7", "8", "9").contains(jsonObj.get(j+rvalues[i].substring(1)).toString())) {
		    		  muta+="_:"+jsonObj.get(j+"typevalue")+j+" <"+rvalues[i].substring(1)+"> \""+jsonObj.get(j+rvalues[i].substring(1))+"\" .\n";
		    	  }else if(!jsonObj.get(j+rvalues[i].substring(1)).equals("") && Arrays.asList("0","1", "2", "3","4","5","6","7", "8", "9").contains(jsonObj.get(j+rvalues[i].substring(1)).toString())) {
		    		  muta+="_:"+jsonObj.get(j+"typevalue")+j+" <"+rvalues[i].substring(1)+"> _:"+jsonObj.get(jsonObj.get(j+rvalues[i].substring(1))+"typevalue")+jsonObj.get(j+rvalues[i].substring(1))+" .\n";

		    	  }
	    	   		  }
		      }
	    	  j++;
	      }
	      
		 Transaction txn = dgraphClient.newTransaction();
		  Mutation mu =Mutation.newBuilder().setSetNquads(ByteString.copyFromUtf8(muta.toString())).build();	  
		  		txn.mutate(mu);
				txn.commit();
				
				return muta;
	}
	
	@PostMapping("/edge")
	  public String edge(@RequestBody String abc) {
		//System.out.println(abc);
		JSONObject jsonObj = new JSONObject(abc);
		String muta="<"+jsonObj.get("Node1")+"> <"+jsonObj.get("ctype")+"> <"+jsonObj.get("Node2")+"> .\n";
		 Transaction txn = dgraphClient.newTransaction();
		  Mutation mu =Mutation.newBuilder().setSetNquads(ByteString.copyFromUtf8(muta.toString())).build();	  
		  		txn.mutate(mu);
				txn.commit();
				
				return muta;
		}
	
	@RequestMapping("/query")
	  public String query(@RequestBody String abc) {
		String sch=schemapush();
		JSONObject jsonObj0 = new JSONObject(sch);
		 JSONArray arrObj = jsonObj0.getJSONArray("schema");
		 Map< String,String> hm =  new HashMap< String,String>();
		 for(int i=0;i<arrObj.length();i++) {
			 JSONObject temp=new JSONObject(arrObj.get(i).toString());
			 if(temp.getString("predicate").length()<=5 || !temp.getString("predicate").substring(0,6).equals("dgraph")) {
			 hm.put(temp.getString("predicate"), temp.getString("type"));
			 }
		 }
		 
	//	 System.out.println(hm);
		  JSONObject jsonObj = new JSONObject(abc);  
		  Set<String> set = jsonObj.keySet()
                .stream()
                .filter(s -> s.startsWith("r"))
                .collect(Collectors.toSet());
		  String[] rvalues = new String[set.size()];
	      set.toArray(rvalues);
	      //System.out.println(rvalues[0]);
	      String query="{\n "+"people(func: ";
		  
	      if(jsonObj.get("qtype").equals("has")) {
	    	  query+="has("+jsonObj.get("comparator")+")) {\n ";
	      }else{
	    	  query+=jsonObj.get("qtype")+"("+jsonObj.get("comparator")+", "+jsonObj.get("inputvalue")+")) {\n ";
	      }
	      
	      for(int i=0;i<rvalues.length;i++) {
	    	   if(jsonObj.get(rvalues[i]).toString()=="true") {
	    		   if(!hm.get(rvalues[i].substring(1)).equals("uid")) {
	    			   query+=rvalues[i].substring(1)+"\n ";
	    			   }else {
	    				   query+=rvalues[i].substring(1)+"{\n";
	    				   query+="uid \n";
	    				   for(int j=0;j<rvalues.length;j++) {
	    					   
	    					   if(!hm.get(rvalues[j].substring(1)).equals("uid")) {
	    		    			   query+=rvalues[j].substring(1)+"\n ";
	    					   }
	    				   }
	    				   query+="}\n";
	    			   }
	    	  }
	      }
	      
	      query+="uid \n";
	      
	      query+="}\n "+"}";
	      
	   //   System.out.println(query);

		Response response = dgraphClient.newReadOnlyTransaction().query(query);
		//System.out.println(response.getJson().toStringUtf8());
		return response.getJson().toStringUtf8();

		}
	  
	  @RequestMapping("/upsert")
	  public String upsert(@RequestBody String abc) {
		  	  
		  JSONObject jsonObj = new JSONObject(abc);
		  
		  Set<String> set = jsonObj.keySet().stream()
                .filter(s -> s.startsWith("r"))
                .collect(Collectors.toSet());
		  String[] rvalues = new String[set.size()];
	      set.toArray(rvalues);
	      
	      Set<String> set1 = jsonObj.keySet()
                .stream()
                .filter(s -> s.startsWith("z"))
                .collect(Collectors.toSet());
		  String[] zvalues = new String[set1.size()];
	      set1.toArray(zvalues);
	      
	  	String query="query {\n "+"q(func: eq("+jsonObj.get("comparator")+", "+"\""+jsonObj.get("inputvalue")+"\""+")) {\n "+"v as uid\n ";
	    
	  	for(int i=0;i<rvalues.length;i++) {
	    	  String check=jsonObj.get(rvalues[i]).toString();
	    	  if(check=="true") {
	    		  query+=rvalues[i].substring(1)+"\n ";
	    	  }
	      }
	      
	  	query+="}\n "+"}\n ";
	  	
	  	String muta="";
	  	
	  	for(int j=0;j<zvalues.length;j++) {
	    	  if(!jsonObj.get(zvalues[j]).equals("")) {
	    		  muta+="uid(v) <"+zvalues[j].substring(1)+"> \""+jsonObj.get(zvalues[j])+"\" .\n ";
	    	  }
	      }
	  	
	  		Transaction txn = dgraphClient.newTransaction();
	  		Mutation mu = Mutation.newBuilder().setSetNquads(ByteString.copyFromUtf8(muta)).build();
	  		Request request = Request.newBuilder().setQuery(query).addMutations(mu).setCommitNow(true).build();
	  		txn.doRequest(request);
	  		txn.commit();
	  		return muta;
	      }
	  
	  @PostMapping("/delete")
	  public String
	  delete(@RequestBody String abc) {
		  
		  JSONObject jsonObj = new JSONObject(abc);
		  
		  Set<String> set = jsonObj.keySet().stream()
                .filter(s -> s.startsWith("r"))
                .collect(Collectors.toSet());
		  String[] rvalues = new String[set.size()];
	      set.toArray(rvalues);
		  
		  String muta="";
		  
		  if(jsonObj.get("uid").toString()=="true") {
			  for(int i=0;i<rvalues.length;i++) {
				  muta+="<"+jsonObj.get("Node1")+"> <"+rvalues[i].substring(1)+"> * .\n";
			  }
			  muta+="<"+jsonObj.get("Node1")+"> * * .\n";
		  }else {
			  for(int i=0;i<rvalues.length;i++) {
				  if(jsonObj.get(rvalues[i]).toString()=="true") {
					  muta+="<"+jsonObj.get("Node1")+"> <"+rvalues[i].substring(1)+"> * .\n";
				  }
			  }
		  }
		  
		 Transaction txn = dgraphClient.newTransaction();
		  Mutation mu =Mutation.newBuilder().setDelNquads(ByteString.copyFromUtf8(muta)).build();
		  		txn.mutate(mu);
				txn.commit();
				return muta;
		}
	  
	  @DeleteMapping("/logOut")
	  public void LogOut() {
		  this.dgraphClient=null;
		  this.adminPass="";
		  this.ipAddr="";
	  }
}
