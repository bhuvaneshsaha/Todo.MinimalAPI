import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginDto } from 'src/app/shared/models/dtos/login-dto';
import { TodoService } from 'src/app/core/services/todo.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  isError = false;

  login = new FormGroup<LoginForm>({
    email: new FormControl('bhuvi@test.com', {nonNullable: true}),
    password: new FormControl('$Pass@321', {nonNullable: true}),
  });

  authService: AuthService = inject(AuthService);
  cdf: ChangeDetectorRef = inject(ChangeDetectorRef);
  router = inject(Router)
  constructor() {
  }

  signIn() {
    const email = this.login.get('email')?.value ?? '';
    const password = this.login.get('password')?.value ?? '';
    this.authService.login(email, password).subscribe({
      next: response => {
        // Handle successful login
        this.gotoDashboard();
        console.log('aa',this.authService.authState);
        this.authService.update();
      },
      error: error => {
        // Handle login error
        this.isError = true;
        this.cdf.detectChanges();
        console.error('Login failed:', error);

      }
    });
  }

  registerUser() {
    alert('Under development');
  }

  private gotoDashboard() {
    this.router.navigate(['/']);
  }
}

interface LoginForm {
  email: FormControl<string>;
  password?: FormControl<string>;
}
