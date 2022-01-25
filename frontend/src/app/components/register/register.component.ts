import { AuthService } from './../../services/auth.service';
import { userType } from 'src/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: userType = {
    nickname:'',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit(): void { }

  onSubmit() {
    this.auth.registerNewUser(this.user);
  }

}
