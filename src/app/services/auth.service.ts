import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth, database } from '../../firebase';
import { ref, set, get } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private router: Router) {
    // Listen to auth state changes
    auth.onAuthStateChanged((user: User | null) => {
      this.userSubject.next(user);
    });
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<UserCredential> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Save user to database
      if (result.user) {
        this.saveUserToDatabase(result.user);
      }

      return result;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  }

  // Save user to database
  private async saveUserToDatabase(user: User): Promise<void> {
    console.log('Saving user to database...');

    try {
      // User reference
      const userRef = ref(database, 'users/' + user.uid);

      // Check if user exists
      const snapshot = await get(userRef);
      const existingData = snapshot.exists() ? snapshot.val() : {};
      const currentTime = new Date().toISOString();

      // User data to save
      const userData = {
        // Basic user info
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        lastLogin: currentTime,

        // Created date (only set on first registration)
        createdAt: snapshot.exists()
          ? existingData.createdAt || currentTime
          : currentTime,

        // User profile info (preserve existing values if they exist)
        profile: {
          phone: existingData.profile?.phone || '',
          location: existingData.profile?.location || '',
          bio: existingData.profile?.bio || '',
        },

        // User preferences
        preferences: {
          notifications:
            existingData.preferences?.notifications !== undefined
              ? existingData.preferences.notifications
              : true,
          darkMode:
            existingData.preferences?.darkMode !== undefined
              ? existingData.preferences.darkMode
              : false,
          language: existingData.preferences?.language || 'tr',
        },

        // User activity data
        activity: {
          totalLogins: (existingData.activity?.totalLogins || 0) + 1,
          favoriteCount: existingData.activity?.favoriteCount || 0,
          lastActive: currentTime,
        },

        // User statistics
        stats: {
          listedCars: existingData.stats?.listedCars || 0,
          soldCars: existingData.stats?.soldCars || 0,
          viewedCars: existingData.stats?.viewedCars || 0,
          rating: existingData.stats?.rating || 0,
          reviewCount: existingData.stats?.reviewCount || 0,
        },
      };

      // Write to database
      await set(userRef, userData);
      console.log('User data saved successfully.');
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }
}
