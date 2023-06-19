import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavComponent } from './core/components/nav/nav.component';
import { AuthService, AuthState } from './core/services/auth.service';
import { LoginResponseDto } from './shared/models/dtos/login-response-dto';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { Injectable } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: MockAuthService;
  let router: Router;

  // Set up the test bed before each test case
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        RouterModule.forRoot([
          { path: 'login', component: LoginComponent }
        ]),
      ],
      declarations: [],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        Router,
      ],
    }).compileComponents();
  });

  // Set up the component and service before each test case
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent); // Create the component fixture
    component = fixture.componentInstance; // Get the component instance
    authService = TestBed.inject(AuthService) as MockAuthService; // Get the AuthService instance
    router = TestBed.inject(Router); // Get the AuthService instance
  });

  // Test that the component is created successfully
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // Test that the AuthService instance is created successfully
  it('should have an AuthService instance', () => {
    expect(authService).toBeTruthy();
  });

  it('should display the nav component when the user is authenticated', () => {
    authService.login('authService', '');
    fixture.detectChanges();
    const navComponent = fixture.debugElement.query(By.directive(NavComponent));
    expect(navComponent).toBeTruthy();
  });

  it('should display the router outlet when the user is authenticated', () => {
    authService.login('authService', '');
    fixture.detectChanges();
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });

  it('should not display the nav component when the user is not authenticated', () => {
    authService.logout();

    // log isLoggedIn = signal(false); value
    authService.isLoggedIn.bind(console.log);
    console.log('isLoggedIn:', authService.isLoggedIn);

    fixture.detectChanges();
    const navComponent = fixture.debugElement.query(By.directive(NavComponent));
    expect(navComponent).toBeFalsy();
  });

  it('should display the login component when the user is not authenticated', () => {
    authService.logout();
    fixture.detectChanges();
    router.navigate(['/auth']);
    fixture.detectChanges();
    const loginComponent = fixture.debugElement.query(By.css('router-outlet'));


    console.log('fixture.debugElement:', JSON.stringify(fixture.debugElement.classes, null, 2));
    expect(loginComponent).toBeTruthy();
  }
  );

});

@Injectable()
class MockAuthService extends AuthService {

  override login(email: string, password: string) {
    const loginResponseDto: LoginResponseDto = {
      token: 'mockToken',
      user: {
        id: "1",
        email: email,
        name: 'Mock User',
        mobile: ''
      }
    };
    this.isLoggedIn.set(true);
    this.authState.token = loginResponseDto.token;
    this.authState.user = loginResponseDto.user;
    MockAuthService.userToken = loginResponseDto.token;
    AuthService.userToken = loginResponseDto.token;
    return of(loginResponseDto);
  }

  override logout() {
    this.authState.token = null;
    this.authState.user = null;
    MockAuthService.userToken = null;
    AuthService.userToken = null;
    this.isLoggedIn.set(false);
    return of(true);
  }
}
