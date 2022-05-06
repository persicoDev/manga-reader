import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userType } from 'src/user';


const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({ providedIn: 'root' })

export class AuthService {

  private apiUrl = 'http://localhost:4000/api';

  constructor(private http:HttpClient) { }

  registerNewUser(formData: userType) {
    return this.http.post<userType>(`${this.apiUrl}/register`, formData, httpOption).subscribe(
      data => console.log(data),
      err => console.log(err)
    );
  }

  login(formData: userType) {
    return this.http.post<userType>(`${this.apiUrl}/login`, formData, httpOption).subscribe(
      data => console.log(data),
      err => console.log(err)
    );
  }

}
