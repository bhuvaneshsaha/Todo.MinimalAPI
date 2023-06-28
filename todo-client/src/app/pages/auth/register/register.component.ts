import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterDto } from 'src/app/shared/models/dtos/register-dto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  @Output() gotoLoginPage = new EventEmitter<void>();

  error = '';

  // match password and confirm password
  registerForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      mobile: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*'),
      ]),
    },
    { validators: [this.matchPassword] }
  );

  matchPassword(control: AbstractControl): ValidationErrors | null {
    // console.log('matchPassword', control);
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    // console.log('password', password);
    // console.log('confirmPassword', confirmPassword);
    if (password != confirmPassword) {
      control.get('password')?.setErrors({ passwordMismatch: true });
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('password')?.setErrors(null);
      control.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  authService: AuthService = inject(AuthService);
  cdf: ChangeDetectorRef = inject(ChangeDetectorRef);
  router = inject(Router);

  registerUser() {
    const name = this.registerForm.get('name')?.value ?? '';
    const email = this.registerForm.get('email')?.value ?? '';
    const password = this.registerForm.get('password')?.value ?? '';
    const confirmPassword =
      this.registerForm.get('confirmPassword')?.value ?? '';
    const mobile = this.registerForm.get('mobile')?.value ?? '';

    if (password !== confirmPassword) {
      this.cdf.detectChanges();
      return;
    }

    const registerDto: RegisterDto = {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
    };
    this.authService.register(registerDto).subscribe({
      next: (response) => {
        this.router.navigate(['/auth/login']);
        this.gotoLoginPage.emit();
        this.authService.update();
      },
      error: (error: HttpErrorResponse) => {
        // Handle login error
        this.error = error.error;
        this.cdf.detectChanges();
        console.error('Login Message:', error.error);
      },
    });
  }

  isInvalidAndDirty(name: string): boolean {
    let control = this.registerForm.get(name);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
