import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { HeroComponent } from '../features/hero/hero';
import { AboutComponent } from '../features/about/about';
import { TechStackComponent } from '../features/tech-stack/tech-stack';
import { ProjectsComponent } from '../features/projects/projects';
import { ContactComponent } from '../features/contact/contact';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    TechStackComponent,
    ProjectsComponent,
    ContactComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a href="#main-content" class="skip-to-main" i18n>Saltar al contenido principal</a>
    <app-header />
    
    <main id="main-content">
      <app-hero />
      <app-about />
      <app-tech-stack />
      <app-projects />
      <app-contact />
    </main>

    <app-footer />
  `,
  styles: [`
    .skip-to-main {
      position: absolute;
      top: -100px;
      left: 0;
      padding: 1rem;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      z-index: 9999;
      text-decoration: none;
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      transition: top 0.2s ease-in-out;
      border-radius: 0 0 8px 0;
    }
    .skip-to-main:focus {
      top: 0;
    }
    main {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
  `]
})
export class LayoutComponent {}
