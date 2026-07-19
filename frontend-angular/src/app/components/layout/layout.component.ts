import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="d-flex">
      <nav class="sidebar">
        <div class="brand">
          <h2>CourseHub</h2>
          <small>Panel Administrativo</small>
        </div>
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
          <i class="fas fa-chart-pie"></i> Dashboard
        </a>
        <a routerLink="/courses" routerLinkActive="active" class="nav-link">
          <i class="fas fa-book"></i> Cursos
        </a>
        <a routerLink="/users" routerLinkActive="active" class="nav-link">
          <i class="fas fa-users"></i> Usuarios
        </a>
        <a (click)="logout()" class="nav-link" style="cursor:pointer; margin-top: auto">
          <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
        </a>
      </nav>
      <div class="main-content">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div></div>
          <div class="d-flex align-items-center gap-2">
            <i class="fas fa-user-circle"></i>
            <span>{{ (authService.currentUser)?.name }}</span>
          </div>
        </div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class LayoutComponent {
  constructor(public authService: AuthService) {}
  logout() { this.authService.logout(); }
}
