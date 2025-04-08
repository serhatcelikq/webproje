import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';

interface SettingItem {
  id: string;
  icon: string;
  title: string;
  iconBg: string;
  isLogout?: boolean;
  action: () => void;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate(
          '800ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class ProfileComponent implements OnInit {
  theme: Theme;
  isDarkMode = false;
  showBackButton = true;

  settingsItems: SettingItem[] = [
    {
      id: '1',
      icon: '👤',
      title: 'Profil Bilgileri',
      iconBg: '#4CAF5020',
      action: () => {},
    },
    {
      id: '2',
      icon: '🔔',
      title: 'Bildirimler',
      iconBg: '#FF980020',
      action: () => {},
    },
    {
      id: '3',
      icon: '🔒',
      title: 'Güvenlik',
      iconBg: '#2196F320',
      action: () => {},
    },
    {
      id: '4',
      icon: '💳',
      title: 'Ödeme Yöntemleri',
      iconBg: '#9C27B020',
      action: () => {},
    },
    {
      id: '5',
      icon: '🚪',
      title: 'Çıkış Yap',
      iconBg: '#F4433620',
      isLogout: true,
      action: () => this.handleLogout(),
    },
  ];

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private authService: AuthService
  ) {
    this.theme = this.themeService.getTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });

    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  goBack(): void {
    this.router.navigate(['/main']);
  }

  async handleLogout(): Promise<void> {
    try {
      await this.authService.signOut();
      // No need for manual navigation, AuthService already handles this
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback navigation if AuthService signOut fails
      this.router.navigate(['/login']);
    }
  }
}
