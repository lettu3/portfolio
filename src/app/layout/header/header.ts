import { Component, ChangeDetectionStrategy, inject, signal, HostListener, LOCALE_ID, isDevMode, PLATFORM_ID } from '@angular/core';
import { NgClass, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../core/theme.service';
import { ScrollService } from '../../core/scroll.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header [ngClass]="{'scrolled': isScrolled()}" class="header">
      <div class="container">
        <a href="#" (click)="scrollToTop($event)" class="logo" aria-label="Volver al inicio">
          <img src="assets/icons/logo.svg" alt="IGB" class="logo-icon">
        </a>

        <nav class="desktop-nav" aria-label="Navegación principal">
          <ul class="nav-list">
            @for (link of navLinks; track link.id) {
              <li>
                <a 
                  [href]="'#' + link.id" 
                  (click)="scrollTo(link.id, $event)"
                  [ngClass]="{'active': scroll.activeSection() === link.id}"
                  [attr.aria-current]="scroll.activeSection() === link.id ? 'page' : null">
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <div class="header-actions">
          <div class="lang-switcher">
            <select (change)="changeLang($event)" [value]="currentLang()" aria-label="Cambiar idioma" i18n-aria-label>
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="ja">JA</option>
            </select>
          </div>

          <button 
            (click)="theme.toggleTheme()" 
            class="theme-toggle" 
            [attr.aria-label]="theme.isDark() ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'">
            @if (theme.isDark()) {
              <!-- Sun icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            } @else {
              <!-- Moon icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>

          <button 
            class="mobile-menu-btn" 
            (click)="toggleMobileMenu()" 
            [attr.aria-expanded]="isMobileMenuOpen()" 
            aria-label="Menú principal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              @if (isMobileMenuOpen()) {
                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
              } @else {
                <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
              }
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Overlay -->
      <nav 
        class="mobile-nav" 
        [ngClass]="{'open': isMobileMenuOpen()}" 
        aria-label="Navegación móvil">
        <ul class="mobile-nav-list">
          @for (link of navLinks; track link.id) {
            <li>
              <a 
                [href]="'#' + link.id" 
                (click)="scrollTo(link.id, $event); closeMobileMenu()"
                [ngClass]="{'active': scroll.activeSection() === link.id}">
                {{ link.label }}
              </a>
            </li>
          }
        </ul>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: transparent;
      transition: background-color 0.3s ease, border-bottom 0.3s ease, backdrop-filter 0.3s ease;
      
      &.scrolled {
        background-color: var(--md-sys-color-surface-container-highest-alpha, rgba(var(--md-sys-color-surface-container-highest-rgb), 0.8));
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
      }
    }

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .logo {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--md-sys-color-on-surface);
      text-decoration: none;
      letter-spacing: -0.5px;
      
      span {
        color: var(--md-sys-color-primary);
      }
    }

    .logo-icon {
      height: 32px;
      width: auto;
      /* Se adapta al color del texto usando mask o filter si tu SVG lo requiere,
         o puedes dejar el SVG con currentColor */
    }

    .desktop-nav {
      display: none;
      
      @media (min-width: 768px) {
        display: block;
      }

      .nav-list {
        display: flex;
        gap: 2rem;
        list-style: none;
        margin: 0;
        padding: 0;

        a {
          color: var(--md-sys-color-on-surface-variant);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s ease;
          position: relative;

          &:hover, &.active {
            color: var(--md-sys-color-primary);
          }

          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: -4px;
            left: 0;
            background-color: var(--md-sys-color-primary);
            transform: scaleX(0);
            transform-origin: bottom right;
            transition: transform 0.25s ease-out;
          }

          &.active::after {
            transform: scaleX(1);
            transform-origin: bottom left;
          }
        }
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    button {
      background: none;
      border: none;
      color: var(--md-sys-color-on-surface);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      border-radius: 50%;
      transition: background-color 0.2s ease, color 0.2s ease;

      &:hover {
        background-color: var(--md-sys-color-surface-container-highest);
        color: var(--md-sys-color-primary);
      }
    }

    .mobile-menu-btn {
      display: flex;
      @media (min-width: 768px) {
        display: none;
      }
    }

    .lang-switcher select {
      background: transparent;
      border: 1px solid var(--md-sys-color-outline-variant);
      color: var(--md-sys-color-on-surface);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.875rem;
      padding: 0.25rem 0.5rem;
      border-radius: var(--md-sys-shape-corner-small, 8px);
      cursor: pointer;
      transition: border-color 0.2s ease;

      &:focus-visible {
        outline: 2px solid var(--md-sys-color-primary);
        outline-offset: 2px;
        border-color: var(--md-sys-color-primary);
      }
    }

    .mobile-nav {
      position: fixed;
      top: 64px; /* header height */
      left: 0;
      width: 100%;
      height: calc(100vh - 64px);
      background-color: var(--md-sys-color-surface);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s;
      z-index: 999;
      display: flex;
      flex-direction: column;
      padding: 2rem;

      &.open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .mobile-nav-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;

        a {
          color: var(--md-sys-color-on-surface);
          text-decoration: none;
          font-size: 1.25rem;
          font-weight: 500;
          
          &.active {
            color: var(--md-sys-color-primary);
            font-weight: 600;
          }
        }
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .header, .mobile-nav, a::after {
        transition: none !important;
      }
    }
  `]
})
export class HeaderComponent {
  theme = inject(ThemeService);
  scroll = inject(ScrollService);
  localeId = inject(LOCALE_ID);
  platformId = inject(PLATFORM_ID);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  currentLang = signal(this.localeId.split('-')[0]);

  navLinks = [
    { id: 'home', label: $localize`:@@nav.home:Inicio` },
    { id: 'about', label: $localize`:@@nav.about:Sobre mí` },
    { id: 'stack', label: $localize`:@@nav.tech:Tecnologías` },
    { id: 'projects', label: $localize`:@@nav.projects:Proyectos` },
    { id: 'contact', label: $localize`:@@nav.contact:Contacto` }
  ];

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 20);
    }
  }

  scrollTo(sectionId: string, event: Event) {
    // Let the browser handle the URL hash update natively for accessibility
    // The CSS scroll-behavior: smooth will handle the smooth scrolling
    
    // We still keep the custom scroll in case the browser behavior needs a fallback,
    // but without preventDefault() so the URL is updated.
    this.scroll.scrollTo(sectionId);
  }

  scrollToTop(event: Event) {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Remove the hash from the URL
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  changeLang(event: Event) {
    const select = event.target as HTMLSelectElement;
    const newLang = select.value;
    
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    if (isDevMode()) {
      alert("En modo desarrollo (ng serve), solo se sirve un idioma a la vez. Para ver la versión en " + newLang + ", reinicia el servidor con: ng serve --configuration=" + newLang);
      select.value = this.currentLang();
      return;
    }

    // Redirect to the new language folder
    const currentPath = window.location.pathname;
    
    // English is at root, others are at /<lang>/
    const targetPrefix = newLang === 'en' ? '/' : '/' + newLang + '/';
    
    if (this.currentLang() !== 'en') {
      const langPattern = new RegExp('^/' + this.currentLang() + '/');
      window.location.href = currentPath.replace(langPattern, targetPrefix);
    } else {
      // If we are in 'en' (which is at '/'), just append the new path or go to root
      window.location.href = targetPrefix;
    }
  }
}
