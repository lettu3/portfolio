import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="footer-container">
        <p class="copyright" i18n>© 2026 Ignacio Gomez Barrios</p>
        <div class="social-links">
          <a href="https://github.com/lettu3" target="_blank" rel="noopener noreferrer" aria-label="Perfil de GitHub" i18n-aria-label>
            <span class="social-icon github" aria-hidden="true"></span>
          </a>
          <a href="https://www.linkedin.com/in/ignacio-gomez-barrios-cs/" target="_blank" rel="noopener noreferrer" aria-label="Perfil de LinkedIn" i18n-aria-label>
            <span class="social-icon linkedin" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      border-top: 1px solid var(--md-sys-color-outline-variant);
      background-color: var(--md-sys-color-surface);
      padding: 2rem 1.5rem;
      margin-top: 4rem;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      
      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    .copyright {
      color: var(--md-sys-color-on-surface-variant);
      font-size: 0.875rem;
      margin: 0;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      
      a {
        color: var(--md-sys-color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.2s ease, transform 0.2s ease;

        &:hover {
          opacity: 0.7;
          transform: scale(1.15);
        }

        .social-icon {
          width: 20px;
          height: 20px;
          background-color: currentColor;
          display: inline-block;
          -webkit-mask: center / contain no-repeat;
          mask: center / contain no-repeat;

          &.github {
            -webkit-mask-image: url('/assets/icons/github.svg');
            mask-image: url('/assets/icons/github.svg');
          }

          &.linkedin {
            -webkit-mask-image: url('/assets/icons/linkedin.svg');
            mask-image: url('/assets/icons/linkedin.svg');
          }
        }
      }
    }
    
  `]
})
export class FooterComponent {}
