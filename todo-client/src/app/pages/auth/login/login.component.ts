import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginDto } from 'src/app/shared/models/dtos/login-dto';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  login = new FormGroup<LoginForm>({
    email: new FormControl('bhuvi@test.com', {nonNullable: true}),
    password: new FormControl('$Pass@321', {nonNullable: true}),
  });

  authService: AuthService = inject(AuthService);

  constructor() {}

  signIn() {

    const email = this.login.get('email')?.value ?? '';
    const password = this.login.get('password')?.value ?? '';
    this.authService.login(email, password).subscribe({
      next: response => {
        // Handle successful login
        console.log('Logged in successfully!');
        console.log('Logged in successfully!' +this.authService.userIsAuthenticated );
        console.log('from login => authService', this.authService);
      },
      error: error => {
        // Handle login error
        console.error('Login failed:', error);
      }
    });
  }
}

interface LoginForm {
  email: FormControl<string>;
  password?: FormControl<string>;
}
