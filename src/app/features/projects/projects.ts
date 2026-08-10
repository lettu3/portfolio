import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ProjectCardComponent } from './project-card';
import { PROJECTS } from '../../shared/data/projects.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SectionTitleComponent, ScrollRevealDirective, ProjectCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="projects-section">
      <div class="container" appScrollReveal>
        <app-section-title 
          title="Proyectos" i18n-title
          subtitle="Algunos de mis trabajos destacados" i18n-subtitle>
        </app-section-title>

        <div class="grid">
          @for (project of projects; track project.title; let i = $index) {
            <div class="card-wrapper" [style.animation-delay]="(i * 100) + 'ms'">
              <app-project-card [project]="project"></app-project-card>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .projects-section {
      padding: 6rem 1.5rem;
      background-color: var(--md-sys-color-background);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: 1fr;
    }

    .card-wrapper {
      opacity: 0;
      animation: cardReveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes cardReveal {
      from {
        opacity: 0;
        transform: translateY(24px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .grid {
        gap: 2.5rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .card-wrapper {
        opacity: 1;
        animation: none;
      }
    }
  `
})
export class ProjectsComponent {
  projects = PROJECTS;
}
