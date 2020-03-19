import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { UserCred } from '../user-cred';
import { Router } from '@angular/router';
import { JavaconnService } from '../javaconn.service';
import { ForDelete } from '../for-delete'
import { GroupCred } from '../group-cred'
import { GroupInfo } from '../group-info'
import { AssignUser } from '../assign-user'
import { GroupData } from '../group-data'
import { Schema } from '../schema';
import { NgForm } from '@angular/forms';

import * as vis from 'vis';
import { Node } from '../node';
import  { Edges } from '../edges'


import { GoogleUpload } from '../google-upload';
import * as Stomp from 'stompjs';
import { ThrowStmt, flatten } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  animations: [
    trigger('fadeIn', [
      state('initial', style({
        opacity:0
      })),

      state('final', style({
        opacity:1
      })),
      transition('initial=>final', animate('600ms')),
      transition('final=>initial', animate('600ms'))
    ])
  ]
})
export class TestComponent implements OnInit {

  dataarray=[];
  schemamodel= new Schema();
  mutation=[];
  selected='none';
  example;
  example1;
  queryobj;
  queryans;
  display="graph";
  hmm=0;
  schemaMessage=""

  getIndex = number => number - 1;

  types = [
    {id:'default',name:'default'},
    {id:'bool',name:'bool'},
    {id:'float',name:'float'},
    {id:'datetime',name:'datetime'},
    {id:'geo',name:'geo'},
    {id: 'int',name:'int'},
    {id:'password',name:'password'},
    {id:'string',name:'string'},
    {id:'uid',name:'uid'}
  ]
  qtypes = [
    {id:'has',name:'has'},
    {id:'eq',name:'equal to'},
    {id:'ge',name:'greater than or equal to'},
    {id:'le',name:'less than or equal to'},
    {id:'gt',name:'greater than'},
    {id:'lt',name:'less than'}
  ]
  public action="";
  currentState = 'initial';
  userCred=new UserCred()
  forDelete=new ForDelete()
  groupCred=new GroupCred()
  groupInfo=new GroupInfo()
  assignUser=new AssignUser()
  groupData=new GroupData()
  googleUpload=new GoogleUpload()
  passMatch=false
  userStatus=false
  deleteStatus=false
  showUserMessage=false
  showUpdateMessage=false
  adminAccess=false
  showUserOp=false
  showGroupOp=false
  showGroupStatus=false
  showGroupDelete=false
  showGroupIn=false
  assignStatus=false
  showUid=false
  state='up'
  buttonShow='down'
  check
  showMessage=""
  deleteMessage=""
  userMessage=[]
  updateMessage=""
  currentUser=""
  groupMessage=""
  groupDeleteMessage=""
  assignMessage=""
  uid=""
  groupInfoMessage=[]
  theads=[]
  tvalues=[]
  forUpload="google"
  ws: any;
  adminOperations=["Create New User","Delete User","Show User Info","Update User Password"]

  userOperations=["Add Schema","Define Type","Add Data","Add Data Using Type","Make Edges","Query","Upsert","Delete","Bulk Upload"]

  groupOperations=["Create New Group","Delete Group","Assign User to Group","Group Info"]
  jj=""
  tt=""
  userOp=false;
  show=false;
  dropDown='up'
  constructor(
    private router: Router,
    private javaConn : JavaconnService
    ) { 
    }

  ngOnInit() {
    this.schemamodel=new Schema();
    this.dataarray.push(this.schemamodel);

    setTimeout(()=>{
      this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    },0)
    this.currentUser=this.javaConn.decodeToken().userid
    if(this.currentUser==="groot")
    {
      this.adminAccess=true
      this.disableTerminal=false
    }
    else{
      this.adminAccess=false
    }
  }
  mutationdata=[]
  mutationtdata=[]
  mutationtype=[]
  edgeQuery=[]
  edgeQueryuid=[]
  edgeQuerydata=[]
  mutationclasstype=[]
  disableTerminal=true
  onClick(func)
  {
    this.action=func
    if(func==="Upsert" || func==="Define Type" || func==="Add Schema")
    { this.disableTerminal=true
      this.mutation.length=0
      this.mutationtype.length=0
      this.javaConn.schemapush().subscribe(data=>
        {
          this.example=data
          let j=0
          for(let i=0;i<this.example.schema.length;i++){
            if(this.example.schema[i].predicate.substring(0,6)!="dgraph"){
            this.mutation[j]=this.example.schema[i].predicate;
            this.mutationtype[j]=this.example.schema[i].type;
            j++;
            }
          }
        })
    }else if(func==="Query"){
      this.disableTerminal=false
      this.mutation.length=0
      this.mutationtype.length=0
      this.javaConn.schemapush().subscribe(data=>
        {
          this.example=data
          let j=0
          for(let i=0;i<this.example.schema.length;i++){
            if(this.example.schema[i].predicate.substring(0,6)!="dgraph"){
            this.mutation[j]=this.example.schema[i].predicate;
            this.mutationtype[j]=this.example.schema[i].type;
            j++;
            }
          }
        })
    } else if(func==="Add Data"){
      this.javaConn.schemapush().subscribe(data=>
        { this.disableTerminal=true
          this.mutation.length=0
          this.mutationtype.length=0
          this.example=data
          let j=0
          for(let i=0;i<this.example.schema.length;i++){
            if(this.example.schema[i].predicate.substring(0,6)!="dgraph"){
            this.mutation[j]=this.example.schema[i].predicate;
            this.mutationtype[j]=this.example.schema[i].type;
            j++;
            }
          }
        })
      //  this.mutationdata.push(this.mutation);
    }else if(func==="Add Data Using Type"){
      this.disableTerminal=true
      this.mutation.length=0
      this.mutationtype.length=0
      this.mutationclasstype.length=0
      this.javaConn.schemapush().subscribe(data=>
        {
          this.example=data
          let j=0
          for(let i=0;i<this.example.schema.length;i++){
            if(this.example.schema[i].predicate.substring(0,6)!="dgraph"){
            this.mutation[j]=this.example.schema[i].predicate;
            this.mutationtype[j]=this.example.schema[i].type;
            j++;
            }
          }
          for(let k=0;k<this.example.types.length;k++){
            this.mutationclasstype.push(this.example.types[k].name);
          }
        })
      //  this.mutationtdata.push(this.mutation);
    }
    else if(func==="Make Edges" || func==="Delete"){
      this.disableTerminal=true
      this.edgeQueryuid.length=0;
      this.edgeQuerydata.length=0;
      this.javaConn.edgeQuery().subscribe(data=>
      {
        this.example1=data
        this.edgeQuery=this.example1.people
        for(let i=0;i<this.edgeQuery.length;i++){
          this.edgeQueryuid[i]=this.edgeQuery[i].uid
          this.edgeQuerydata[i]=this.edgeQuery[i].uid+" "
          for(let j=0;j<this.mutation.length;j++){
            if(this.mutationtype[j]!="uid" && this.edgeQuery[i][this.mutation[j]]!=undefined){
            this.edgeQuerydata[i]=this.edgeQuerydata[i]+" "+this.edgeQuery[i][this.mutation[j]]
            }
          }
        }
      })
    }
    else if(func==="Bulk Upload"){
      this.disableTerminal=false
      this.javaConn.shutDown().subscribe(data=>{
        console.log(data)
      })
    }
    this.passMatch=false
    this.userStatus=false
    this.deleteStatus=false
    this.showUserMessage=false
    this.showUpdateMessage=false
    this.showGroupStatus=false
    this.showGroupDelete=false
    this.showGroupIn=false
    this.assignStatus=false
    this.show=false
    this.userCred.userid=""
    this.userCred.pass=""
    this.userCred.repass=""
    this.forDelete.userid=""
    this.googleUpload.rdfLink=""
    this.googleUpload.schemaLink=""
    this.TO=[]
    this.onChange()
  }
  displayopt(opt){
    this.display=opt
  }

  onSubmit()
  {
    this.javaConn.addUser(this.userCred).subscribe(data =>{
      console.log(data)
      this.check="unable to create user because of conflict: "+this.userCred.userid;
      if(data===this.check)
      {
        this.userStatus=true
        this.showMessage="UserId already exists"
      }
      else if(data==="the two typed passwords do not match")
      {
        this.userStatus=true
        this.showMessage="The two typed Passwords do not match"
      }
      else
      {
        this.userStatus=true
        this.showMessage="User Added Successfully" 
        this.forDelete.userid=this.userCred.userid
        this.javaConn.showUser(this.forDelete).subscribe(data=>
          {
            this.userMessage=[]
            console.log(data)
            var lines = data.split('\n');
            if(lines[6]==="Unable to show info: The user \""+this.forDelete.userid+"\" does not exist.")
            {
              this.showUserMessage=true
              this.userMessage[0]="No user with id: "+this.forDelete.userid
            }
            else
            {
              this.showUserMessage=true
              for(var lineNumber = 6; lineNumber < lines.length-1; lineNumber ++)
              {
                this.userMessage[lineNumber-6]=lines[lineNumber]+"\n"
              if(!this.theads.includes(lines[lineNumber].substr(0, lines[lineNumber].indexOf(':'))))
              {
                this.theads.push(lines[lineNumber].substr(0, lines[lineNumber].indexOf(':')))
                this.tvalues.push(lines[lineNumber].substr(lines[lineNumber].indexOf(':')+2, lines[lineNumber].length-1))
              }
              }
            }
          })
      }
    })
  }

  onDelete()
  {
    this.javaConn.showUser(this.forDelete).subscribe(data =>
      {
        console.log(data)
        this.userMessage=[]
        var lines = data.split('\n');
          this.showUserMessage=false
          this.show=true
          this.uid=lines[7].substr(lines[7].indexOf(':')+2, lines[7].length-1)
          console.log(this.uid)
          if(this.uid!="")
          {
            this.showUid=true
            this.javaConn.deleteUser(this.forDelete).subscribe(data => 
            {
              var comp="Unable to delete the user: unable to delete \""+ this.forDelete.userid+"\" since it does not exist"
              if(data===comp)
              {
                this.deleteStatus=true
                this.deleteMessage="No such user"
              }
              else
              {
                this.deleteStatus=true
                this.deleteMessage= "Deleted Successfully"
              }
            })
        }  
        else{
          this.showUid=false
          this.deleteStatus=true
                this.deleteMessage="No such user"
        }   
      }
    )
  }
  //chnage to be done here
  userInfo()
  {
    this.javaConn.showUser(this.forDelete).subscribe(data =>
      {
        console.log(data)
        this.userMessage=[]
        var lines = data.split('\n');
        if(lines[5].substring(21,48)==="unable to get admin context")
        {
          this.showUserMessage=true
          this.userMessage[0]="Admin Password is Incorrect"
        }
        else if(lines[6]==="Unable to show info: The user \""+this.forDelete.userid+"\" does not exist.")
        {
          this.showUserMessage=true
          this.userMessage[0]="No user with id: "+this.forDelete.userid
        }
        else
        {
          this.showUserMessage=false
          this.show=true
          for(var lineNumber = 6; lineNumber < lines.length-1; lineNumber ++)
          {
            this.userMessage[lineNumber-6]=lines[lineNumber]+"\n"
            if(!this.theads.includes(lines[lineNumber].substr(0, lines[lineNumber].indexOf(':'))))
            {
              this.theads.push(lines[lineNumber].substr(0, lines[lineNumber].indexOf(':')))
              this.tvalues.push(lines[lineNumber].substr(lines[lineNumber].indexOf(':')+2, lines[lineNumber].length-1))
            }
          }
        }     
      }
    )
  }

  onUpdate()
  {
    this.javaConn.updateUser(this.userCred).subscribe(data =>
      {
        var result="Unable to modify: user \""+this.userCred.userid+"\" does not exist"
        if(data===result)
        {
          this.updateMessage="No such user"
          this.showUpdateMessage=true
        }
        else if(data==="Unable to modify: the two typed passwords do not match")
        {
          this.updateMessage="password mis match"
          this.showUpdateMessage=true
        }
        else
        {
          this.updateMessage="Password Updated"
          this.showUpdateMessage=true
        }
      })
  }

  showUser()
  {
    if(this.jj==="")
      this.jj="isSelected"
    else  
      this.jj=""

    if(this.showUserOp===true)
      this.showUserOp=false
    else  
      this.showUserOp=true 
   
  }
  showUserOperations(){
    if(this.jj==="")
      this.jj="isSelected"
    else  
      this.jj=""

    if(this.userOp===true){
      this.userOp=false;
    }
    else{
      this.userOp=true
    }
  }

  showGroup()
  {
    if(this.tt==="")
      this.tt="isSelected"
    else  
      this.tt=""

    if(this.showGroupOp===true)
      this.showGroupOp=false
    else  
      this.showGroupOp=true  
  }

  forGroupCred()
  {
    this.showGroupStatus=true
    this.javaConn.addGroup(this.groupCred).subscribe(data=>
      {
        this.groupMessage=data
      })
  }

  groupDelete()
  {
    this.javaConn.deleteGroup(this.groupInfo).subscribe(data=>
      {
        var comp="Unable to delete the user: unable to delete \""+ this.groupInfo.groupId+"\" since it does not exist"
        if(data===comp)
        {
          this.showGroupDelete=true
          this.groupDeleteMessage="No group with the group id: "+this.groupInfo.groupId
        }
        else
        {
          this.showGroupDelete=true
          this.groupDeleteMessage= "Group Deleted Successfully"
        }
      })
  }
  assignGroup()
  {
    console.log(this.assignUser)
    this.javaConn.assignUser(this.assignUser).subscribe(data=>
      {
        this.assignStatus=true
        console.log(data)
        if(data==="Unable to modify: user \""+this.assignUser.userId+"\" does not exist")
        {
          this.assignMessage="No such User"
        }
        else if(data==="Unable to modify: group \""+this.assignUser.groupId+"\" does not exist")
        {
          this.assignMessage="No such Group"
        }
        else if(data==="Nothing needs to be changed for the groups of user: "+this.assignUser.userId)
        {
          this.assignMessage="The user is already assigned to this group"
        }
        else
        {
          this.assignMessage="User Assigned to the Group Successfully"
        }
      })
  }
//change
  showGroupInfo()
  {
    this.javaConn.showGroupInfo(this.groupData).subscribe(data=>
      {
        console.log(data)
        this.groupInfoMessage=[]
        var lines = data.split('\n');
        if(lines[5].substring(21,48)==="unable to get admin context")
        {
          this.showGroupIn=true
          this.groupInfoMessage[0]="Admin Password is Incorrect"
        }
        else if(lines[7]==="Unable to show info: The group \""+this.groupData.groupId+"\" does not exist.")
        {
          this.showGroupIn=true
          this.groupInfoMessage[0]="No group with id: "+this.groupData.groupId
        }
        else
        {
          this.showGroupIn=true
          for(var lineNumber = 6; lineNumber < lines.length-1; lineNumber ++)
          {
            this.groupInfoMessage[lineNumber-6]=lines[lineNumber]+"\n"
          }
        }    
      })
  }
  logOff()
  {
    this.javaConn.logout();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.router.navigate([''])
  }
  onAdd(){
    this.schemamodel=new Schema();
    this.dataarray.push(this.schemamodel);
  }
  removeData(index){
    this.dataarray.splice(index);
  }
  onAddm(){
    
    this.mutationdata.push(this.mutation);
  }
  removeDatam(index){
 
    this.mutationdata.splice(index);
  }

  onAddtm(){
    this.hmm++
    this.mutationtdata.push(this.mutation);
  }
  removeDatatm(index){
    this.hmm=index
    this.mutationtdata.splice(index);
  }

  Messaget=[]
  onSubmitSchema(){
    this.Messaget.length=0;
      this.javaConn.addSchema(this.dataarray).subscribe(data => {
        this.Messaget=data.split('\n')
        this.schemaMessage="Schema Added"
      })
      this.dataarray.length=0
      this.schemamodel=new Schema();
      this.dataarray.push(this.schemamodel);
      setTimeout(() => { this.onClick("Add Schema"); }, 30);
      setTimeout(() => { this.schemaMessage=""; }, 3000);
  }

  edgeMessage=""
  onSubmitEdge(form: NgForm){
  //  console.log(form.value)
  this.Messaget.length=0;
    this.javaConn.addEdge(form.value).subscribe(data => {
      this.Messaget[0]=data
      this.edgeMessage="Edge Added"
    })
    form.reset()
    setTimeout(() => { this.edgeMessage=""; }, 3000);
}

mutationMessage=""
  onSubmitMutation(form: NgForm){
    this.Messaget.length=0;
    this.javaConn.addMutation(form.value).subscribe(data => {
      this.Messaget=data.split('\n')
      this.mutationMessage="Data Added"
    })
    this.mutationdata.length=0
    setTimeout(() => { this.mutationMessage=""; }, 3000);
  }

  tmutationMessage=""
  onSubmitTMutation(form: NgForm){
   // console.log(form.value)
   this.Messaget.length=0;
    this.javaConn.addTMutation(form.value).subscribe(data => {
      this.Messaget=data.split('\n')
      this.tmutationMessage="Data Added"
    })
    this.mutationtdata.length=0
    this.hmm=0
    setTimeout(() => { this.tmutationMessage=""; }, 3000);
  } 


typeMessage=""
  onSubmitType(form: NgForm){
    this.javaConn.addType(form.value).subscribe(data => {
      this.Messaget=data.split('\n')
      this.typeMessage="Type Added"
    })
    form.reset()
    setTimeout(() => { this.typeMessage=""; }, 3000);
    
  }

vals;
queryreturnval=[]
queryansfinal=[]
queryreturntype=[]
nodedata=[]
edgedata=[]

  onSubmitQuery(form: NgForm){
   // console.log(form.value)
    this.queryansfinal.length=0;
    this.queryreturntype.length=0;
    this.queryreturnval.length=0;
    this.vals=form.value
    let j=0;
    this.queryreturnval[j]=("uid");
    this.queryreturntype[j]=("string");
    j++;
    for(let i=0;i<this.mutation.length;i++){
      let temp ="r"+this.mutation[i]
      if(form.value[temp]){
        this.queryreturnval[j]=this.mutation[i];
        this.queryreturntype[j]=this.mutationtype[i];;
        j++;
      }
    }

    this.javaConn.addQuery(form.value).subscribe(data => {
      this.queryans=data
      console.log(this.queryans)
    for(let i=0;i<this.queryans.people.length;i++){
     this.queryansfinal[i]=this.queryans.people[i]
     var node= new Node();
     
     node.id=this.queryans.people[i].uid
     node.label=""
     for(let j=1;j<this.queryreturnval.length;j++){
       if(this.queryreturntype[j]!="uid" && this.queryans.people[i][this.queryreturnval[j]]!=undefined){
       node.label+=this.queryans.people[i][this.queryreturnval[j]]+", "
     }else if(this.queryreturntype[j]=="uid" && this.queryans.people[i][this.queryreturnval[j]]!=undefined){
     
      var edge= new Edges();
      if(this.nodedata.find(ob => ob['id'] === this.queryans.people[i][this.queryreturnval[j]][0].uid)==undefined){
      var node1 =new Node();
      node1.id=this.queryans.people[i][this.queryreturnval[j]][0].uid
      node1.label=""
      for(let k=1;k<this.queryreturnval.length;k++){
        if(this.queryreturntype[k]!="uid" && this.queryans.people[i][this.queryreturnval[j]][0][this.queryreturnval[k]]!=undefined){
        node1.label+=this.queryans.people[i][this.queryreturnval[j]][0][this.queryreturnval[k]]+", "}
        }
        node1.label=node1.label.substring(0,node1.label.length-2)
      this.nodedata.push(node1)
    }
      edge.from=this.queryans.people[i].uid
      edge.to=this.queryans.people[i][this.queryreturnval[j]][0].uid
      edge.label=this.queryreturnval[j]
      this.edgedata.push(edge)
     
    }
  }
    node.label=node.label.substring(0,node.label.length-2)
    if(this.nodedata.find(ob => ob['id'] === this.queryans.people[i].uid)==undefined){
    this.nodedata.push(node)
  }
  
}

 var nodes = new vis.DataSet(this.nodedata);
 var edges = new vis.DataSet(this.edgedata);
 this.nodedata.length=0;
 this.edgedata.length=0;
 

  var container = document.getElementById('mynetwork');
  var data1 = {
    nodes: nodes,
    edges: edges
  };
  var options = {nodes: {
    shape: "dot",
    size: 16,
    shadow: true,
    smooth: true,
  },
  edges:{
    arrows: 'to',
    shadow: true,
    smooth: true,
  },
  physics: {
    forceAtlas2Based: {
      gravitationalConstant: -26,
      centralGravity: 0.005,
      springLength: 230,
      springConstant: 0.18
    },
    maxVelocity: 146,
    solver: "forceAtlas2Based",
    timestep: 0.35,
   // stabilization: { iterations: 15 }
  }};
  var network = new vis.Network(container, data1, options);
    
  }
  )
}

TO=[]
deletEMessage=""
onSubmitDelete(form: NgForm){
  this.Messaget.length=0;
   this.javaConn.delete(form.value).subscribe(data => {
     this.Messaget=data.split('\n')
     this.deletEMessage="Deleted"
   })
   form.reset()
   setTimeout(() => { this.onClick("Delete"); }, 30);
   setTimeout(() => { this.deletEMessage=""; }, 3000);
 } 


bulkUpload(form : NgForm){
  this.forUpload=form.value
  console.log(this.forUpload)
}

upsertMessage=""

  onSubmitUpsert(form: NgForm){
   // console.log(form.value)
   this.Messaget.length=0;
    this.javaConn.addUpsert(form.value).subscribe(data => {
      this.Messaget=data.split('\n')
      this.upsertMessage="Data Updated"
    })
    form.reset()
    setTimeout(() => { this.upsertMessage=""; }, 3000);
  }

  forGoogleUpload(){
    let socket = new WebSocket("ws://localhost:8081/chat");
    this.ws = Stomp.over(socket);
    let that = this;
    this.ws.connect({}, function(frame) {
     ; that.ws.subscribe("/errors", function(message) {
        alert("Error " + message.body);
      })
      that.ws.subscribe("/topic/messages", function(message) {
        that.TO.push(message.body)
      });
    }, function(error) {
      alert("STOMP error " + error);
    });
    this.javaConn.driveUpload(this.googleUpload).subscribe(data=>{
      console.log(data)
    })
  }
  showArrow=true
  collapse(){ 
    if(this.showArrow){
      this.showArrow=!this.showArrow
    document.getElementById("LeftSide").style.width="0";
    document.getElementById("RightSide").style.width="100vw";
    if(document.getElementById("LeftSideMenu")){
      document.getElementById("LeftSideMenu").style.width="0";
    }
    if(document.getElementById("InnerRight")){
      document.getElementById("InnerRight").style.width="72vw";
    }
    if(document.getElementById("mynetwork")){
      document.getElementById("mynetwork").style.width="70vw";
    }
    if(document.getElementById("Terminal")){
      document.getElementById("Terminal").style.width="85vw";
    }
    if(document.getElementById("qTerminal")){
      document.getElementById("qTerminal").style.width="100vw";
    }
    }else{
      this.showArrow=!this.showArrow
      document.getElementById("LeftSide").style.width="17.5vw";
      document.getElementById("RightSide").style.width="82.5vw";
      if(document.getElementById("LeftSideMenu")){
        document.getElementById("LeftSideMenu").style.width="17.5";
      }
      if(document.getElementById("InnerRight")){
        document.getElementById("InnerRight").style.width="55vw";
      }
      if(document.getElementById("mynetwork")){
        document.getElementById("mynetwork").style.width="52vw";
      }
      if(document.getElementById("Terminal")){
        document.getElementById("Terminal").style.width="70vw";
      }
      if(document.getElementById("qTerminal")){
        document.getElementById("qTerminal").style.width="82.5vw";
      }
    }  
    } 
  showTerminal=false
  symbol="˄"
    tCollapse(){
      if(this.showTerminal)
      {
        document.getElementById("qTerminal").style.height="4vh";
        this.symbol="˄"
        this.showTerminal=false
      }
      else
      {
        document.getElementById("qTerminal").style.height="30vh";
        this.symbol="˅"
        this.showTerminal=true
      }
    }
    onChange(){
      document.getElementById("qTerminal").style.height="4vh";
        this.symbol="˄"
        this.showTerminal=false
    }
}

