import { Injectable, signal, inject, PLATFORM_ID, afterNextRender, OnDestroy } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollService implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  
  readonly activeSection = signal<string>('home');
  private observer: IntersectionObserver | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.setupIntersectionObserver();
        
        // Handle initial load with hash in URL
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
          const id = hash.substring(1);
          // Use setTimeout to ensure DOM is fully painted
          setTimeout(() => {
            this.scrollTo(id);
          }, 100);
        }
      });
    }
  }

  scrollTo(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = this.document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  private setupIntersectionObserver(): void {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -79% 0px', // Trigger when section crosses the top ~20% of the viewport
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = this.document.querySelectorAll('section[id]');
    sections.forEach(section => this.observer?.observe(section));
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
