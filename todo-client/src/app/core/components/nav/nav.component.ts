import { ChangeDetectionStrategy, Component, Input, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultGravatarImage, GravatarService } from '../../services/gravatar.service';
import { AuthService, AuthState } from '../../services/auth.service';
import { share } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [AuthService],
})
export class NavComponent implements OnInit {
  @Input() user!: User;
  gravatarService = inject(GravatarService);
  authService = inject(AuthService);
  router = inject(Router);
  userImage = signal('');

  async ngOnInit() {
    if(!this.user?.email) return;
    const thumbnail = await this.gravatarService.getGravatarUrl(this.user.email, DefaultGravatarImage.Identicon);
    console.log('thumbnail', thumbnail);
    this.userImage.set(thumbnail);
    console.log('this.userImage', this.userImage());
  }

  logout() {
    this.router.navigate(['/auth']);
    this.authService.logout();
  }


  async getGravatarImage(): Promise<string> {
    return '';
    // return await this.gravatarService.getGravatarUrl(this.authService.loggedUser.email, 'yourDefaultImage.png');
  }

}
