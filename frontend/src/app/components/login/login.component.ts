import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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
  
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.auth.login(this.user);
  }
}
