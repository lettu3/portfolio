import { Component, ChangeDetectionStrategy, inject, signal, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgClass, isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [ReactiveFormsModule, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" i18n>Contacto</h2>
          <div class="underline" aria-hidden="true"></div>
          <p class="section-subtitle" i18n>¿Tienes un proyecto en mente o quieres ponerte en contacto? Envíame un mensaje.</p>
        </div>

        <div class="contact-content">
          <div class="form-container glass-panel">
            @if (isSubmitted()) {
              <div class="success-message" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="success-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <h3 i18n>¡Mensaje preparado!</h3>
                <p i18n>Se ha abierto tu cliente de correo para enviar el mensaje.</p>
                <button class="btn btn-outline mt-4" (click)="resetForm()" i18n>Enviar otro mensaje</button>
              </div>
            } @else {
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form" novalidate>
                <div class="form-group">
                  <input 
                    type="text" 
                    id="nombre" 
                    formControlName="nombre" 
                    class="form-control" 
                    [ngClass]="{'is-invalid': isFieldInvalid('nombre'), 'is-filled': contactForm.get('nombre')?.value}"
                    aria-required="true"
                    [attr.aria-invalid]="isFieldInvalid('nombre')"
                    [attr.aria-describedby]="isFieldInvalid('nombre') ? 'error-nombre' : null">
                  <label for="nombre" class="floating-label" i18n>Nombre</label>
                  @if (isFieldInvalid('nombre')) {
                    <span id="error-nombre" class="error-message" role="alert" i18n>El nombre es requerido</span>
                  }
                </div>

                <div class="form-group">
                  <input 
                    type="email" 
                    id="email" 
                    formControlName="email" 
                    class="form-control" 
                    [ngClass]="{'is-invalid': isFieldInvalid('email'), 'is-filled': contactForm.get('email')?.value}"
                    aria-required="true"
                    [attr.aria-invalid]="isFieldInvalid('email')"
                    [attr.aria-describedby]="isFieldInvalid('email') ? 'error-email' : null">
                  <label for="email" class="floating-label" i18n>Email</label>
                  @if (isFieldInvalid('email')) {
                    <span id="error-email" class="error-message" role="alert" i18n>
                      @if (contactForm.get('email')?.errors?.['required']) {
                        El email es requerido
                      } @else if (contactForm.get('email')?.errors?.['email']) {
                        El formato de email no es válido
                      }
                    </span>
                  }
                </div>

                <div class="form-group">
                  <textarea 
                    id="mensaje" 
                    formControlName="mensaje" 
                    class="form-control textarea" 
                    rows="5"
                    [ngClass]="{'is-invalid': isFieldInvalid('mensaje'), 'is-filled': contactForm.get('mensaje')?.value}"
                    aria-required="true"
                    [attr.aria-invalid]="isFieldInvalid('mensaje')"
                    [attr.aria-describedby]="isFieldInvalid('mensaje') ? 'error-mensaje' : null"></textarea>
                  <label for="mensaje" class="floating-label" i18n>Mensaje</label>
                  @if (isFieldInvalid('mensaje')) {
                    <span id="error-mensaje" class="error-message" role="alert" i18n>
                      @if (contactForm.get('mensaje')?.errors?.['required']) {
                        El mensaje es requerido
                      } @else if (contactForm.get('mensaje')?.errors?.['minlength']) {
                        El mensaje debe tener al menos 10 caracteres
                      }
                    </span>
                  }
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary submit-btn" 
                  [disabled]="contactForm.invalid">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  <span i18n>Enviar Mensaje</span>
                </button>
              </form>
            }
          </div>
          
          <div class="contact-info">
            <div class="info-card">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <h3 class="info-title" i18n>Email</h3>
                <p class="info-text">ignas.gomezb12&#64;gmail.com</p>
              </div>
            </div>
            
            <div class="info-card">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <h3 class="info-title" i18n>Ubicación</h3>
                <p class="info-text" i18n>Ciudad de Córdoba, Argentina.<br/>Disponible para remoto.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      padding: 6rem 1.5rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-header {
      margin-bottom: 4rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
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
      margin-bottom: 1.5rem;
    }

    .section-subtitle {
      color: var(--md-sys-color-on-surface-variant);
      font-size: 1.125rem;
      max-width: 600px;
      margin: 0;
    }

    .contact-content {
      display: grid;
      gap: 3rem;
      grid-template-columns: 1fr;
      
      @media (min-width: 992px) {
        grid-template-columns: 3fr 2fr;
      }
    }

    .glass-panel {
      background-color: var(--md-sys-color-surface-container-low);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    .form-group {
      position: relative;
      margin-bottom: 2rem;
    }

    .form-control {
      width: 100%;
      padding: 1rem 1rem 1rem 0;
      background: transparent;
      border: none;
      border-bottom: 2px solid var(--md-sys-color-outline);
      color: var(--md-sys-color-on-surface);
      font-family: inherit;
      font-size: 1rem;
      transition: border-color 0.2s ease;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-bottom-color: var(--md-sys-color-primary);
      }

      &.is-invalid {
        border-bottom-color: var(--md-sys-color-error);
      }
      
      &.textarea {
        resize: vertical;
        min-height: 120px;
      }
    }

    .floating-label {
      position: absolute;
      left: 0;
      top: 1rem;
      color: var(--md-sys-color-on-surface-variant);
      transition: 0.2s ease all;
      pointer-events: none;
      font-size: 1rem;
    }

    .form-control:focus ~ .floating-label,
    .form-control.is-filled ~ .floating-label {
      top: -0.75rem;
      font-size: 0.875rem;
      color: var(--md-sys-color-primary);
    }

    .form-control.is-invalid ~ .floating-label {
      color: var(--md-sys-color-error);
    }

    .error-message {
      color: var(--md-sys-color-error);
      font-size: 0.875rem;
      position: absolute;
      bottom: -1.5rem;
      left: 0;
    }

    .btn {
      padding: 0.875rem 1.75rem;
      border-radius: 9999px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: center;
      
      &.btn-primary {
        background-color: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        
        &:hover:not(:disabled) {
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
          transform: translateY(-2px);
        }
        
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          box-shadow: none;
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

    .submit-btn {
      width: 100%;
      margin-top: 1rem;
    }

    .success-message {
      text-align: center;
      padding: 2rem 0;
      
      .success-icon {
        color: var(--md-sys-color-primary);
        margin-bottom: 1.5rem;
      }
      
      h3 {
        font-size: 1.5rem;
        color: var(--md-sys-color-on-surface);
        margin: 0 0 1rem 0;
      }
      
      p {
        color: var(--md-sys-color-on-surface-variant);
        margin-bottom: 2rem;
      }
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .info-card {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
    }

    .info-icon {
      width: 48px;
      height: 48px;
      background-color: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .info-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
      margin: 0 0 0.25rem 0;
    }

    .info-text {
      color: var(--md-sys-color-on-surface-variant);
      margin: 0;
    }

    .mt-4 { margin-top: 1rem; }

    @media (prefers-reduced-motion: reduce) {
      .btn, .form-control, .floating-label {
        transition: none !important;
      }
    }
  `]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  
  isSubmitted = signal(false);

  contactForm = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]]
  });

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const { nombre, email, mensaje } = this.contactForm.value;
      const subject = encodeURIComponent(`Nuevo mensaje de ${nombre} desde el portfolio`);
      const body = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`);
      
      const mailtoLink = `mailto:ignas.gomezb12@gmail.com?subject=${subject}&body=${body}`;
      
      // Open default mail client
      if (isPlatformBrowser(this.platformId)) {
        window.location.href = mailtoLink;
      }
      
      this.isSubmitted.set(true);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.contactForm.reset();
    this.isSubmitted.set(false);
  }
}
