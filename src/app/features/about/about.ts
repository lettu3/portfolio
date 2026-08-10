import { Component, ChangeDetectionStrategy, inject, signal, ElementRef, PLATFORM_ID, afterNextRender, OnDestroy } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-about',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="about-section" [ngClass]="{'is-visible': isVisible()}">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" i18n>Sobre mí</h2>
          <div class="underline" aria-hidden="true"></div>
        </div>

        <div class="about-content">
          <div class="bio-container">
            <p class="bio-text" i18n>
              Soy un desarrollador Full-Stack con experiencia profesional en el desarrollo de aplicaciones robustas y escalables. Mi stack principal incluye Java con Spring Boot en el backend, y React con TypeScript en el frontend, complementado con PostgreSQL y Docker para bases de datos y contenedorización. Además, cuento con conocimientos en C/C++, Haskell y Python adquiridos durante mi formación académica.
            </p>
          </div>

          <div class="stats-grid">
            <div class="stat-card glass-panel">
              <div class="stat-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <h3 class="stat-title" i18n>Full-Stack</h3>
              <p class="stat-desc" i18n>Desarrollo End-to-End</p>
            </div>
            
            <div class="stat-card glass-panel">
              <div class="stat-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <h3 class="stat-title" i18n>Backend & Frontend</h3>
              <p class="stat-desc" i18n>Spring Boot / React</p>
            </div>

            <div class="stat-card glass-panel">
              <div class="stat-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3 class="stat-title" i18n>+10 Tecnologías</h3>
              <p class="stat-desc" i18n>Dominio y aprendizaje continuo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      padding: 6rem 1.5rem;
      min-height: 80vh;
      display: flex;
      align-items: center;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    .section-header {
      margin-bottom: 4rem;
      position: relative;
    }

    .section-title {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      color: var(--md-sys-color-on-surface);
      margin: 0 0 0.5rem 0;
    }

    .underline {
      height: 4px;
      width: 60px;
      background-color: var(--md-sys-color-primary);
      border-radius: 2px;
      transition: width 0.6s ease-out;
    }

    .about-content {
      display: grid;
      gap: 4rem;
      grid-template-columns: 1fr;
      
      @media (min-width: 992px) {
        grid-template-columns: 1fr 1fr;
        align-items: center;
      }
    }

    .bio-container {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .bio-text {
      font-size: 1.125rem;
      line-height: 1.8;
      color: var(--md-sys-color-on-surface-variant);
      margin: 0;
    }

    .stats-grid {
      display: grid;
      gap: 1.5rem;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s;
    }

    .glass-panel {
      background-color: var(--md-sys-color-surface-container-low);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: 24px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        border-color: var(--md-sys-color-primary);
      }
    }

    .stat-icon {
      color: var(--md-sys-color-primary);
      margin-bottom: 1.5rem;
      background-color: var(--md-sys-color-primary-container);
      width: 64px;
      height: 64px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--md-sys-color-on-surface);
      margin: 0 0 0.5rem 0;
    }

    .stat-desc {
      font-size: 0.875rem;
      color: var(--md-sys-color-on-surface-variant);
      margin: 0;
    }

    /* Animations triggered by intersection observer */
    .is-visible .underline {
      width: 100px;
    }
    
    .is-visible .bio-container,
    .is-visible .stats-grid {
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .bio-container, .stats-grid, .glass-panel, .underline {
        transition: none !important;
        transform: none !important;
        opacity: 1;
      }
      .underline { width: 100px; }
    }
  `]
})
export class AboutComponent implements OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  
  isVisible = signal(false);
  private observer: IntersectionObserver | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                this.isVisible.set(true);
                this.observer?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.2 }
        );
        
        this.observer.observe(this.el.nativeElement);
      });
    } else {
      this.isVisible.set(true);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
