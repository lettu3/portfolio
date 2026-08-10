import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  
  readonly isDark = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Read preference on init
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (storedTheme === 'dark') {
        this.isDark.set(true);
      } else if (storedTheme === 'light') {
        this.isDark.set(false);
      } else {
        this.isDark.set(prefersDark);
      }

      // Sync state to document attribute
      effect(() => {
        const dark = this.isDark();
        const themeValue = dark ? 'dark' : 'light';
        this.document.documentElement.setAttribute('data-theme', themeValue);
        localStorage.setItem('theme', themeValue);
      });
    }
  }

  toggleTheme(): void {
    this.isDark.update(d => !d);
  }
}
