import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto } from 'src/app/shared/models/dtos/login-dto';
import { RegisterDto } from 'src/app/shared/models/dtos/register-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/auth';

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<any>(url, loginDto);
  }

  register(registerDto: RegisterDto): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<any>(url, registerDto);
  }
}
