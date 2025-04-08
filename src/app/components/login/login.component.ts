import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class LoginComponent implements OnInit {
  theme: Theme;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private authService: AuthService
  ) {
    this.theme = this.themeService.getTheme();
  }

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });

    // Check if user is already logged in
    this.authService.user$.subscribe((user) => {
      if (user) {
        // User is signed in, redirect to main page
        this.router.navigate(['/main']);
      }
    });
  }

  async handleGoogleLogin(): Promise<void> {
    this.isLoading = true;
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/main']);
    } catch (error) {
      console.error('Google sign-in error:', error);
      alert('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      this.isLoading = false;
    }
  }

  handleLogin(): void {
    // For now just navigate to main
    this.router.navigate(['/main']);
  }
}
