import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Router } from '@angular/router';
import { User} from '../user'
import { FormControl,FormGroup } from '@angular/forms';
import { JavaconnService } from '../javaconn.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Connection } from '../connection'
import { local } from 'd3';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        backgroundColor: 'white',
        width: '0%',
        opacity:0
      })),
      state('final', style({
        backgroundColor: 'white',
        width: '30%',
        opacity:1
      })),
      transition('initial=>final', animate('600ms')),
      transition('final=>initial', animate('600ms'))
    ]),
  ]
})
export class LoginPageComponent implements OnInit {

  currentState = 'initial';
  showError=false
  result
  errorMessage
  auth
  connectionError=""
  showConnErr=false
  userInfo=new User()
  connectionDone=false
  conn=new Connection()
  constructor(private router: Router,
    private javaConn : JavaconnService
    ) {
  }

  ngOnInit() {
    setTimeout(()=>{
      this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    },0)  

    if(localStorage.getItem('ip')===null){
      this.conn.ip=""
    }
    else
    {
      this.conn.ip=localStorage.getItem('ip')
    }
  }

  onSubmit  (){
    this.javaConn.checkCredentials(this.userInfo).subscribe(data =>{
      this.result=data
      if(this.result.data==null){
        this.errorMessage=this.result.errors[0].message
        this.showError=true
      }
      else{
        this.auth=this.result.data
        document.cookie="token="+this.auth.accessJWT
        this.router.navigate(['/loggedIn'])
      }
    })
  }
  createConn()
  {
    console.log(localStorage.getItem('ip'))
    this.javaConn.createConnection(this.conn).subscribe(data=>
      {
        if(data==="connected"){
          this.connectionDone=!this.connectionDone
          localStorage.setItem('ip',this.conn.ip)
        }
        else{
          this.showConnErr=true
          this.connectionError="No Server on this IP"
        }
      })
      
  }

}
