import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../../components/layout/layout.component';
import { AdminService, UserItem } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutComponent],
  template: `
    <app-layout>
      <div class="page-header">
        <h1>Gestión de Usuarios</h1>
      </div>

      <div class="card-custom">
        <div class="d-flex gap-2 mb-3">
          <input type="text" [(ngModel)]="search" (keyup.enter)="loadUsers()" placeholder="Buscar..." class="form-custom" style="max-width: 300px">
          <select [(ngModel)]="roleFilter" (change)="loadUsers()" class="form-custom" style="max-width: 200px">
            <option value="">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="student">Estudiante</option>
          </select>
          <button class="btn-primary-custom" (click)="loadUsers()">Buscar</button>
        </div>

        <table class="table-custom">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td><strong>{{ user.name }}</strong></td>
              <td>{{ user.email }}</td>
              <td>
                <span [class]="user.role === 'admin' ? 'badge-role badge-admin' : 'badge-role badge-student'">
                  {{ user.role === 'admin' ? 'Administrador' : 'Estudiante' }}
                </span>
              </td>
              <td>{{ user.createdAt | date:'dd/MM/yyyy' }}</td>
              <td>
                <select [ngModel]="user.role" (ngModelChange)="changeRole(user._id, $event)" class="form-custom" style="max-width: 150px; padding: 0.3rem 0.5rem; font-size: 0.8rem">
                  <option value="student">Estudiante</option>
                  <option value="admin">Admin</option>
                </select>
                <button class="btn-sm-custom" style="background: #fee2e2; color: #dc2626; margin-left: 4px" (click)="deleteUser(user._id)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="d-flex justify-content-between align-items-center mt-3" *ngIf="pagination">
          <span style="color: #64748b; font-size: 0.9rem">
            {{ users.length }} de {{ pagination.total }} usuarios
          </span>
          <div class="d-flex gap-2">
            <button class="btn-sm-custom" style="background: #e2e8f0" [disabled]="pagination.page <= 1" (click)="goToPage(pagination.page - 1)">Anterior</button>
            <span style="padding: 0.35rem 0.75rem; font-size: 0.85rem">{{ pagination.page }}/{{ pagination.pages }}</span>
            <button class="btn-sm-custom" style="background: #e2e8f0" [disabled]="pagination.page >= pagination.pages" (click)="goToPage(pagination.page + 1)">Siguiente</button>
          </div>
        </div>
      </div>
    </app-layout>
  `,
})
export class UsersComponent implements OnInit {
  users: UserItem[] = [];
  pagination: any;
  search = '';
  roleFilter = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() { this.loadUsers(); }

  loadUsers(page = 1) {
    const params: any = { page, limit: 20 };
    if (this.search) params.search = this.search;
    if (this.roleFilter) params.role = this.roleFilter;
    this.adminService.getUsers(params).subscribe((res) => {
      this.users = res.users;
      this.pagination = res.pagination;
    });
  }

  goToPage(page: number) { this.loadUsers(page); }

  changeRole(id: string, role: string) {
    this.adminService.updateUser(id, { role }).subscribe(() => this.loadUsers());
  }

  deleteUser(id: string) {
    if (confirm('¿Eliminar este usuario?')) {
      this.adminService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }
}
