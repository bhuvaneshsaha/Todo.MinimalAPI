import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginDto } from 'src/app/shared/models/dtos/login-dto';
import { RegisterDto } from 'src/app/shared/models/dtos/register-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://localhost:7243/auth';

  loggedIn = signal(false);

  // Store the user token

  private _userToken: string | null = null;

  get userIsAuthenticated() {
    // Check if the token exists
    return this._userToken !== null;
  }

  constructor(private http: HttpClient) { }

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
        this._userToken = res;
        if(this._userToken) this.loggedIn.set(true);
        console.log('this._userToken',this._userToken);
      }));
  }

  register(registerDto: RegisterDto): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<any>(url, registerDto);
  }
}
