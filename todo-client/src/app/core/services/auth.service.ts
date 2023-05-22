import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDto } from 'src/app/shared/models/dtos/login-dto';
import { RegisterDto } from 'src/app/shared/models/dtos/register-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.baseURL}/auth`;

  static userToken: string | null = null;

  get userIsAuthenticated() {
    // Check if the token exists
    return AuthService.userToken !== null;
  }

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if(token) {
      console.log(token);
      AuthService.userToken = token;
    }
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const loginDto: LoginDto = {
      email: email,
      password: password
    };
    console.log(loginDto);
    return this.http.post<any>(url, loginDto)
      .pipe(tap(res => {
        // Assume the response contains a token
        AuthService.userToken = res;
        localStorage.setItem('token', AuthService.userToken!);
      }));
  }

  register(registerDto: RegisterDto): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<any>(url, registerDto);
  }
}
