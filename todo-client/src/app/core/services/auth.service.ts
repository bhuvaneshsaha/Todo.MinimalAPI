import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDto } from 'src/app/shared/models/dtos/login-dto';
import { RegisterDto } from 'src/app/shared/models/dtos/register-dto';
import { environment } from 'src/environments/environment';
import { LoginResponseDto } from 'src/app/shared/models/dtos/login-response-dto';
import { User } from 'src/app/shared/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isLoggedIn = signal(false);

  authState = new AuthState();

  baseUrl = `${environment.baseURL}/auth`;

  static userToken: string | null = null;

  get userIsAuthenticated() {
    // Check if the token exists
    return AuthService.userToken !== null;
  }

  get user(): User| null {
    return this.authState.user;
  }

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const authState = localStorage.getItem('authState');
    if(token && authState) {
      AuthService.userToken = token;
      this.authState = JSON.parse(authState);
    }
  }

  update() {
    // this._authState$.next(true);
  }

  login(email: string, password: string): Observable<LoginResponseDto> {
    const url = `${this.baseUrl}/login`;
    const loginDto: LoginDto = {
      email: email,
      password: password
    };
    return this.http.post<LoginResponseDto>(url, loginDto)
      .pipe(tap(res => {
        // Assume the response contains a token
        AuthService.userToken = res.token;

        this.authState.token = res.token;
        this.authState.user = res.user;
        this.isLoggedIn.update(() => true);

        localStorage.setItem('token', AuthService.userToken);
        localStorage.setItem('authState', JSON.stringify(this.authState));
      }));
  }

  register(registerDto: RegisterDto): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<any>(url, registerDto);
  }

  logout() {
    AuthService.userToken = null;
    this.authState.token = null;
    this.authState.user = null;
    this.isLoggedIn.update(() => false);
    localStorage.removeItem('token');
  }
}

export class AuthState {
  token!: string | null;
  user!: User | null;
}
