import { Component, OnInit } from '@angular/core';
import { userType } from 'src/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: userType = {
    nickname:'',
    email: '',
    password: ''
  };
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }
}
