import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Theme {
  cardColor: string;
  shadowColor: string;
  textColor: string;
  secondaryTextColor: string;
  accentColor: string;
  backgroundColor: string;
  headerColor: string;
  tabBarActiveColor: string;
  tabBarInactiveColor: string;
  tabBarBackground: string;
  buttonColor: string;
  borderColor: string;
  iconBackground: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Light theme
  private lightTheme: Theme = {
    cardColor: '#ffffff',
    shadowColor: '#000000',
    textColor: '#212529',
    secondaryTextColor: '#6c757d',
    accentColor: '#3d7eff',
    backgroundColor: '#f8f9fa',
    headerColor: '#ffffff',
    tabBarActiveColor: '#3d7eff',
    tabBarInactiveColor: '#6c757d',
    tabBarBackground: '#ffffff',
    buttonColor: '#f0f0f0',
    borderColor: '#dee2e6',
    iconBackground: '#f0f0f0',
  };

  // Dark theme
  private darkTheme: Theme = {
    cardColor: '#2d3748',
    shadowColor: '#000000',
    textColor: '#f8f9fa',
    secondaryTextColor: '#a9b4c0',
    accentColor: '#4CAF50',
    backgroundColor: '#1a202c',
    headerColor: '#2d3748',
    tabBarActiveColor: '#4CAF50',
    tabBarInactiveColor: '#a9b4c0',
    tabBarBackground: '#2d3748',
    buttonColor: '#3d4a5c',
    borderColor: '#4b5563',
    iconBackground: '#3d4a5c',
  };

  private themeSubject = new BehaviorSubject<Theme>(this.lightTheme);
  theme$ = this.themeSubject.asObservable();

  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {}

  getTheme(): Theme {
    return this.themeSubject.value;
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  toggleTheme(): void {
    const isDarkMode = !this.darkModeSubject.value;
    this.darkModeSubject.next(isDarkMode);
    this.themeSubject.next(isDarkMode ? this.darkTheme : this.lightTheme);
  }
}
