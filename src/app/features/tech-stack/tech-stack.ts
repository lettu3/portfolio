import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { TechCardComponent } from './tech-card';
import { TECH_STACK } from '../../shared/data/tech-stack.data';

type TechCategory = 'all' | 'backend' | 'frontend' | 'devops' | 'languages';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [SectionTitleComponent, ScrollRevealDirective, TechCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="stack" class="tech-section">
      <div class="container" appScrollReveal>
        <app-section-title title="Tecnologías" i18n-title></app-section-title>
        
        <div class="filters-container">
          <ul class="filters" role="tablist" (keydown)="onKeyDown($event)">
            <li role="presentation">
              <button 
                id="tab-all"
                role="tab" 
                aria-controls="panel-tech"
                [attr.aria-selected]="activeCategory() === 'all'"
                [class.active]="activeCategory() === 'all'"
                (click)="setCategory('all')"
                aria-label="Mostrar todas las tecnologías" i18n-aria-label>
                <span i18n>Todas</span>
              </button>
            </li>
            <li role="presentation">
              <button 
                id="tab-backend"
                role="tab" 
                aria-controls="panel-tech"
                [attr.aria-selected]="activeCategory() === 'backend'"
                [class.active]="activeCategory() === 'backend'"
                (click)="setCategory('backend')"
                aria-label="Mostrar tecnologías Backend" i18n-aria-label>
                <span i18n>Backend</span>
              </button>
            </li>
            <li role="presentation">
              <button 
                id="tab-frontend"
                role="tab" 
                aria-controls="panel-tech"
                [attr.aria-selected]="activeCategory() === 'frontend'"
                [class.active]="activeCategory() === 'frontend'"
                (click)="setCategory('frontend')"
                aria-label="Mostrar tecnologías Frontend" i18n-aria-label>
                <span i18n>Frontend</span>
              </button>
            </li>
            <li role="presentation">
              <button 
                id="tab-devops"
                role="tab" 
                aria-controls="panel-tech"
                [attr.aria-selected]="activeCategory() === 'devops'"
                [class.active]="activeCategory() === 'devops'"
                (click)="setCategory('devops')"
                aria-label="Mostrar tecnologías DevOps" i18n-aria-label>
                <span i18n>DevOps</span>
              </button>
            </li>
            <li role="presentation">
              <button 
                id="tab-languages"
                role="tab" 
                aria-controls="panel-tech"
                [attr.aria-selected]="activeCategory() === 'languages'"
                [class.active]="activeCategory() === 'languages'"
                (click)="setCategory('languages')"
                aria-label="Mostrar lenguajes de programación" i18n-aria-label>
                <span i18n>Lenguajes</span>
              </button>
            </li>
          </ul>
        </div>

        <div class="grid" role="tabpanel" id="panel-tech" [attr.aria-labelledby]="'tab-' + activeCategory()">
          @for (tech of filteredTech(); track tech.name) {
            <app-tech-card [tech]="tech"></app-tech-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .tech-section {
      padding: 4rem 1rem;
      background-color: var(--md-sys-color-background);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .filters-container {
      display: flex;
      justify-content: center;
      margin-bottom: 3rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      -webkit-overflow-scrolling: touch;
    }

    .filters {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 1rem;
    }

    .filters button {
      background: none;
      border: none;
      padding: 0.75rem 1.25rem;
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      color: var(--md-sys-color-on-surface-variant);
      cursor: pointer;
      position: relative;
      white-space: nowrap;
      transition: color 0.2s ease;
    }

    .filters button:hover {
      color: var(--md-sys-color-on-surface);
      background-color: var(--md-sys-color-surface-variant);
      border-radius: var(--md-sys-shape-corner-medium, 8px);
    }

    .filters button.active {
      color: var(--md-sys-color-primary);
    }

    .filters button.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background-color: var(--md-sys-color-primary);
      border-radius: 3px 3px 0 0;
    }

    .grid {
      display: grid;
      gap: 1.5rem;
      grid-template-columns: repeat(1, 1fr);
      animation: fadeIn 0.4s ease-out;
    }

    @media (min-width: 600px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 900px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 1200px) {
      .grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (prefers-reduced-motion: reduce) {
      .grid {
        animation: none;
      }
    }
  `
})
export class TechStackComponent {
  activeCategory = signal<TechCategory>('all');
  
  techList = signal(TECH_STACK);
  
  filteredTech = computed(() => {
    const category = this.activeCategory();
    if (category === 'all') return this.techList();
    return this.techList().filter(tech => tech.categories.includes(category as Exclude<TechCategory, 'all'>));
  });

  setCategory(category: TechCategory): void {
    this.activeCategory.set(category);
  }

  onKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    if (target.getAttribute('role') !== 'tab') return;
    
    const tabs = Array.from(document.querySelectorAll('.filters button[role="tab"]')) as HTMLElement[];
    const index = tabs.indexOf(target);
    
    if (event.key === 'ArrowRight') {
      const next = tabs[(index + 1) % tabs.length];
      next.focus();
      event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
      const prev = tabs[(index - 1 + tabs.length) % tabs.length];
      prev.focus();
      event.preventDefault();
    }
  }
}
