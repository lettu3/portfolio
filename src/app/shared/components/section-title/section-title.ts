import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section-title-container">
      <h2 class="title">{{ title() }}</h2>
      <div class="underline" aria-hidden="true"></div>
      @if (subtitle()) {
        <p class="subtitle">{{ subtitle() }}</p>
      }
    </div>
  `,
  styles: `
    .section-title-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 3rem;
      text-align: center;
    }

    .title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--md-sys-color-on-background);
      margin: 0 0 0.5rem 0;
      font-family: 'Inter', sans-serif;
    }

    .underline {
      width: 48px;
      height: 4px;
      background-color: var(--md-sys-color-primary);
      border-radius: var(--md-sys-shape-corner-full, 2px);
      margin-bottom: 1rem;
    }

    .subtitle {
      font-size: 1.125rem;
      color: var(--md-sys-color-on-surface-variant);
      margin: 0;
      max-width: 600px;
      font-family: 'Inter', sans-serif;
    }

    @media (min-width: 768px) {
      .title {
        font-size: 2.5rem;
      }
      .underline {
        width: 64px;
      }
    }
  `
})
export class SectionTitleComponent {
  title = input.required<string>();
  subtitle = input<string>();
}
