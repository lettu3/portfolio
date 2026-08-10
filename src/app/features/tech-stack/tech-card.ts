import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Tech } from '../../shared/models/tech.model';

@Component({
  selector: 'app-tech-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tech-card">
      <div class="icon-container">
        <img [src]="tech().icon" [alt]="tech().name" class="icon" aria-hidden="true" />
      </div>
      <h3 class="name">{{ tech().name }}</h3>
      <div class="category-badge">{{ getCategoryLabel(tech().categories[0]) }}</div>
      <div class="level-indicator" [class.professional]="tech().level === 'professional'">
        @if (tech().level === 'professional') {
          <span i18n>Profesional</span>
        } @else {
          <span i18n>Académico</span>
        }
      </div>
    </div>
  `,
  styles: `
    .tech-card {
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: var(--md-sys-shape-corner-medium, 12px);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: default;
    }

    .tech-card:hover {
      border-color: var(--md-sys-color-outline);
    }

    .icon-container {
      width: 64px;
      height: 64px;
      border-radius: var(--md-sys-shape-corner-full, 50%);
      background-color: var(--md-sys-color-surface-variant);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .icon {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    .name {
      font-family: 'Inter', sans-serif;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
      margin: 0 0 0.5rem 0;
    }

    .category-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--md-sys-color-on-surface-variant);
      margin-bottom: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .level-indicator {
      font-family: 'Inter', sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.25rem 0.75rem;
      border-radius: var(--md-sys-shape-corner-full, 16px);
      background-color: var(--md-sys-color-surface-variant);
      color: var(--md-sys-color-on-surface-variant);
    }

    .level-indicator.professional {
      background-color: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
    }

    @media (prefers-reduced-motion: reduce) {
      .tech-card {
        transition: none;
      }
    }
  `
})
export class TechCardComponent {
  tech = input.required<Tech>();

  getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      'backend': $localize`Backend`,
      'frontend': $localize`Frontend`,
      'devops': $localize`DevOps`,
      'languages': $localize`Lenguajes`
    };
    return labels[category] || category;
  }
}
