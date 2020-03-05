import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserCred } from './user-cred';
import { ForDelete } from './for-delete';
import * as jwt_decode from 'jwt-decode';
import { GroupCred } from './group-cred';
import { GroupInfo } from './group-info'
import { AssignUser } from './assign-user'
import { GroupData } from './group-data';
import { Connection } from './connection';
import { User } from './user'
import { GoogleUpload } from './google-upload';

@Injectable({
  providedIn: 'root'
})
export class JavaconnService {
  private Url: string

  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:8081/';
  }

  public createConnection(conn: Connection){
    return this.http.post(this.Url+"createConnection",conn,{responseType : 'text'})
  }
  public checkCredentials(user : User){
    return this.http.post(this.Url+"check",user)
  }

  public addUser(user1: UserCred)
  {
    return this.http.post(this.Url+"addUser",user1,{responseType: 'text'})
  }

  public deleteUser(user: ForDelete)
  {
    return this.http.post(this.Url+"deleteUser",user,{responseType: 'text'})
  }

  public showUser(user1: ForDelete)
  {
    return this.http.post(this.Url+"User",user1,{responseType: 'text'})
  }

  public updateUser(user : UserCred)
  {
    return this.http.post(this.Url+"updateUser",user,{responseType: 'text'}) 
  }
  public addGroup(group : GroupCred)
  {
    return this.http.post(this.Url+"addGroup",group,{responseType : 'text'})
  }
  public deleteGroup(group : GroupInfo)
  {
    return this.http.post(this.Url+"deleteGroup",group,{responseType : 'text'})
  }
  public assignUser(assigning : AssignUser)
  {
    return this.http.post(this.Url+"usertogroup",assigning,{ responseType : 'text'})
  }
  public showGroupInfo(group : GroupData)
  {
    return this.http.post(this.Url+"groupInfo",group,{ responseType : 'text'})
  }

  public addSchema(dataArray)
  {
    return this.http.post(this.Url+"schema",dataArray,{ responseType : 'text'})
  }
  public schemapush()
  {
    return this.http.get(this.Url+"schemapush");
  }

  public addMutation(dataArray)
  {
    return this.http.post(this.Url+"mutation",dataArray,{responseType:'text'});
  }

  public addQuery(dataArray)
  {
    return this.http.post(this.Url+"query",dataArray);
  }

  public edgeQuery()
  {
    return this.http.get(this.Url+"edgequery");
  }

  public addUpsert(dataArray)
  {
    return this.http.post(this.Url+"upsert",dataArray,{responseType:'text'});
  }

  public addType(dataArray)
  {
    return this.http.post(this.Url+"type",dataArray,{responseType:'text'});
  }
  public addTMutation(dataArray)
  {
    return this.http.post(this.Url+"tmutation",dataArray,{responseType:'text'});
  }

  public addEdge(dataArray)
  {
    return this.http.post(this.Url+"edge",dataArray,{responseType:'text'});
  }

  public delete(dataArray)
  {
    return this.http.post(this.Url+"delete",dataArray,{responseType:'text'});
  }
  public logout(){
    return this.http.delete(this.Url+"logOut")
  }
  public shutDown(){
    return this.http.get(this.Url+"/shutdown",{responseType : 'text'})
  }

  public driveUpload(links : GoogleUpload){
    return this.http.post(this.Url+"googleUpload",links,{responseType : 'text'})
  }

  isLoggedIn()
  {
    if(document.cookie!="") 
      return true
    else  
      return false
  }

  
  decodeToken()
  {
    return jwt_decode(document.cookie)
  }
}
