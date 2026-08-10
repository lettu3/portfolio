import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { Project, ProjectCategory } from '../../shared/models/project.model';

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  systems: $localize`Systems`,
  fullstack: $localize`Full-Stack`,
  functional: $localize`Functional`,
  data: $localize`Data`,
  backend: $localize`Backend`,
  frontend: $localize`Frontend`,
  mobile: $localize`Mobile`,
  devops: $localize`DevOps`
};

@Component({
  selector: 'app-project-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="project-card">
      <div class="image-wrapper">
        @if (project().imageUrl) {
          <img [src]="project().imageUrl" 
               [alt]="project().title" 
               class="project-image"
               width="600"
               height="400"
               loading="lazy" />
        } @else {
          <div class="placeholder-image">
            <span class="code-icon" aria-hidden="true">&lt;/&gt;</span>
          </div>
        }
        <div class="image-overlay"></div>
        <span class="category-badge" [attr.data-category]="project().category">
          {{ categoryLabel() }}
        </span>
      </div>
      
      <div class="content">
        <h3 class="title">{{ project().title }}</h3>
        <p class="description">{{ project().description }}</p>
        
        <div class="tech-stack">
          @for (tech of project().techStack; track tech) {
            <span class="tech-tag">{{ tech }}</span>
          }
        </div>
        
        <div class="actions">
          @if (project().demoUrl) {
            <a [href]="project().demoUrl" 
               class="btn btn-primary" 
               target="_blank" 
               rel="noopener noreferrer"
               [attr.aria-label]="'Ver demo de ' + project().title">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span i18n>Demo</span>
            </a>
          }
          @if (project().repoUrl) {
            <a [href]="project().repoUrl" 
               class="btn btn-outline" 
               target="_blank" 
               rel="noopener noreferrer"
               [attr.aria-label]="'Ver código de ' + project().title">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span i18n>Código</span>
            </a>
          } @else {
            <span class="private-badge">
              <svg class="private-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span i18n>Código privado</span>
            </span>
          }
        </div>
      </div>
    </article>
  `,
  styles: `
    .project-card {
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: var(--md-sys-shape-corner-large, 16px);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), 
                  box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                  border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      height: 100%;
    }

    .project-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08);
      border-color: var(--md-sys-color-primary);
    }

    /* Image area */
    .image-wrapper {
      position: relative;
      height: 220px;
      overflow: hidden;
    }

    .project-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .project-card:hover .project-image {
      transform: scale(1.06);
    }

    .image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        transparent 40%,
        rgba(0, 0, 0, 0.5) 100%
      );
      opacity: 0;
      transition: opacity 0.35s ease;
      pointer-events: none;
    }

    .project-card:hover .image-overlay {
      opacity: 1;
    }

    .placeholder-image {
      height: 100%;
      background-color: var(--md-sys-color-surface-variant);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .code-icon {
      font-family: 'JetBrains Mono', monospace;
      font-size: 3rem;
      font-weight: 700;
      color: var(--md-sys-color-on-surface-variant);
      opacity: 0.4;
    }

    /* Category badge */
    .category-badge {
      position: absolute;
      top: 0.75rem;
      left: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.6875rem;
      font-weight: 600;
      padding: 0.25rem 0.625rem;
      border-radius: var(--md-sys-shape-corner-full, 20px);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      background: rgba(0, 0, 0, 0.55);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.15);
      z-index: 2;
    }

    .category-badge[data-category="systems"] {
      background: rgba(239, 108, 0, 0.75);
    }

    .category-badge[data-category="fullstack"] {
      background: rgba(74, 108, 247, 0.75);
    }

    .category-badge[data-category="functional"] {
      background: rgba(156, 39, 176, 0.75);
    }

    .category-badge[data-category="data"] {
      background: rgba(0, 150, 136, 0.75);
    }

    .category-badge[data-category="backend"] {
      background: rgba(56, 142, 60, 0.75);
    }

    .category-badge[data-category="frontend"] {
      background: rgba(25, 118, 210, 0.75);
    }

    .category-badge[data-category="mobile"] {
      background: rgba(233, 30, 99, 0.75);
    }

    .category-badge[data-category="devops"] {
      background: rgba(69, 90, 100, 0.75);
    }

    /* Content area */
    .content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .title {
      font-family: 'Inter', sans-serif;
      font-size: 1.375rem;
      font-weight: 700;
      color: var(--md-sys-color-on-surface);
      margin: 0 0 0.625rem 0;
      line-height: 1.3;
    }

    .description {
      font-family: 'Inter', sans-serif;
      font-size: 0.9375rem;
      line-height: 1.6;
      color: var(--md-sys-color-on-surface-variant);
      margin: 0 0 1.25rem 0;
      flex-grow: 1;
    }

    /* Tech stack tags */
    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
      margin-bottom: 1.25rem;
    }

    .tech-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.6875rem;
      padding: 0.25rem 0.625rem;
      border-radius: var(--md-sys-shape-corner-full, 16px);
      background-color: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
      letter-spacing: 0.2px;
      white-space: nowrap;
    }

    /* Action buttons */
    .actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.5rem 1.125rem;
      font-family: 'Inter', sans-serif;
      font-size: 0.8125rem;
      font-weight: 600;
      text-decoration: none;
      border-radius: var(--md-sys-shape-corner-full, 20px);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }

    .btn-icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    .btn-primary {
      background-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .btn-primary:hover {
      background-color: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(74, 108, 247, 0.3);
    }

    .btn-outline {
      background-color: transparent;
      color: var(--md-sys-color-on-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
    }

    .btn-outline:hover {
      background-color: var(--md-sys-color-surface-variant);
      border-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-primary);
      transform: translateY(-1px);
    }

    /* Private code badge */
    .private-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-family: 'Inter', sans-serif;
      font-size: 0.75rem;
      color: var(--md-sys-color-on-surface-variant);
      opacity: 0.7;
      padding: 0.375rem 0;
    }

    .private-icon {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .project-card,
      .project-image,
      .image-overlay,
      .btn {
        transition: none !important;
      }
      .project-card:hover {
        transform: none;
      }
      .project-card:hover .project-image {
        transform: none;
      }
    }
  `
})
export class ProjectCardComponent {
  project = input.required<Project>();

  categoryLabel = computed(() => CATEGORY_LABELS[this.project().category]);
}
