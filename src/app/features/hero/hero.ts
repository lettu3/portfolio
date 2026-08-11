import { Component, ChangeDetectionStrategy, inject, signal, afterNextRender, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../core/scroll.service';

@Component({
  standalone: true,
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="home" class="hero-section">
      <div class="hero-content">
        <span class="greeting" i18n>Hola, soy</span>
        <h1 class="name">Ignacio Gomez Barrios</h1>
        
        <div class="subtitle-wrapper" aria-hidden="true">
          <h2 class="subtitle">
            <span class="typing-text">{{ currentText() }}</span><span class="cursor" [class.blink]="isCursorBlinking()">|</span>
          </h2>
        </div>
        <!-- Accessible alternative to typing effect -->
        <h2 class="visually-hidden" i18n>Full-Stack Developer.</h2>

        <div class="actions">
          <button class="btn btn-primary" (click)="scrollTo('projects')" i18n>Ver proyectos</button>
          <button class="btn btn-outline" (click)="scrollTo('contact')" i18n>Contactame</button>
        </div>
      </div>
      
      <!-- Decorative background elements -->
      <div class="decorations" aria-hidden="true">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      padding: 0 1.5rem;
      overflow: hidden;
    }

    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      position: relative;
      z-index: 10;
    }

    .greeting {
      font-family: 'JetBrains Mono', monospace;
      color: var(--md-sys-color-primary);
      font-size: 1.125rem;
      font-weight: 500;
      margin-bottom: 1rem;
      display: block;
    }

    .name {
      font-size: clamp(2.5rem, 8vw, 5rem);
      font-weight: 800;
      line-height: 1.1;
      color: var(--md-sys-color-on-surface);
      margin: 0 0 1rem 0;
      letter-spacing: -1px;
    }

    .subtitle-wrapper {
      height: 3rem;
      margin-bottom: 2.5rem;
    }

    .subtitle {
      font-size: clamp(1.25rem, 4vw, 2.25rem);
      font-weight: 600;
      color: var(--md-sys-color-on-surface-variant);
      margin: 0;
      display: flex;
      align-items: center;
    }
    
    .cursor {
      font-weight: 400;
      color: var(--md-sys-color-primary);
      margin-left: 2px;
      opacity: 1;
      
      &.blink {
        animation: blink 1s step-end infinite;
      }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn {
      padding: 0.875rem 1.75rem;
      border-radius: 9999px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
      
      &.btn-primary {
        background-color: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        
        &:hover {
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      }

      &.btn-outline {
        background-color: transparent;
        color: var(--md-sys-color-primary);
        border: 2px solid var(--md-sys-color-primary);
        
        &:hover {
          background-color: var(--md-sys-color-primary);
          color: var(--md-sys-color-on-primary);
        }
      }
    }

    /* Decorative elements */
    .decorations {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    }

    .circle {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.15;
    }

    .circle-1 {
      width: 500px;
      height: 500px;
      background-color: var(--md-sys-color-primary);
      top: -100px;
      right: -100px;
      animation: float 10s ease-in-out infinite;
    }

    .circle-2 {
      width: 400px;
      height: 400px;
      background-color: var(--md-sys-color-tertiary, var(--md-sys-color-primary));
      bottom: -50px;
      left: -150px;
      animation: float 15s ease-in-out infinite reverse;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-30px) scale(1.05); }
    }

    @media (prefers-reduced-motion: reduce) {
      .btn, .circle, .cursor {
        transition: none !important;
        animation: none !important;
      }
      .cursor.blink {
        opacity: 1;
      }
    }
  `]
})
export class HeroComponent implements OnDestroy {
  scrollService = inject(ScrollService);
  platformId = inject(PLATFORM_ID);

  phrases = [
    $localize`Full-Stack Developer`, 
  ];
  
  currentText = signal('');
  isCursorBlinking = signal(true);
  
  private typingSpeed = 100;
  private erasingSpeed = 50;
  private pauseDelay = 2000;
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          this.currentText.set(this.phrases[0]);
          this.isCursorBlinking.set(false);
        } else {
          this.type();
        }
      });
    } else {
      this.currentText.set(this.phrases[0]);
    }
  }

  type() {
    const currentPhrase = this.phrases[this.phraseIndex];
    
    if (this.isDeleting) {
      this.currentText.set(currentPhrase.substring(0, this.charIndex - 1));
      this.charIndex--;
    } else {
      this.currentText.set(currentPhrase.substring(0, this.charIndex + 1));
      this.charIndex++;
    }

    this.isCursorBlinking.set(false);

    let typeSpeed = this.isDeleting ? this.erasingSpeed : this.typingSpeed;

    if (!this.isDeleting && this.charIndex === currentPhrase.length) {
      typeSpeed = this.pauseDelay;
      this.isDeleting = true;
      this.isCursorBlinking.set(true);
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      typeSpeed = 500; // Pause before typing next phrase
      this.isCursorBlinking.set(true);
    }

    this.typingTimeout = setTimeout(() => this.type(), typeSpeed);
  }

  scrollTo(sectionId: string) {
    this.scrollService.scrollTo(sectionId);
  }

  ngOnDestroy() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }
}
