import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>CourseHub Admin</h2>
        <p class="subtitle">Panel de administración</p>
        <div *ngIf="error" class="alert-custom alert-error">{{ error }}</div>
        <form (ngSubmit)="onSubmit()" class="form-custom">
          <div style="margin-bottom: 1rem">
            <label>Email</label>
            <input type="email" [(ngModel)]="email" name="email" placeholder="admin@coursehub.com" required>
          </div>
          <div style="margin-bottom: 1.5rem">
            <label>Contraseña</label>
            <input type="password" [(ngModel)]="password" name="password" placeholder="••••••••" required>
          </div>
          <button type="submit" class="btn-primary-custom" style="width: 100%; padding: 0.75rem" [disabled]="loading">
            {{ loading ? 'Ingresando...' : 'Iniciar Sesión' }}
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn) this.router.navigate(['/']);
  }

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        if (res.role !== 'admin') {
          this.error = 'Este usuario no tiene permisos de administrador';
          this.authService.logout();
          this.loading = false;
          return;
        }
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al iniciar sesión';
        this.loading = false;
      },
    });
  }
}
