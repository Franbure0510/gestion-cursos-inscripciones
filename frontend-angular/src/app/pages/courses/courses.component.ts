import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LayoutComponent],
  template: `
    <app-layout>
      <div class="page-header">
        <h1>Gestión de Cursos</h1>
        <button class="btn-primary-custom" routerLink="/courses/new">
          <i class="fas fa-plus"></i> Nuevo Curso
        </button>
      </div>

      <div class="card-custom">
        <div class="d-flex gap-2 mb-3">
          <input type="text" [(ngModel)]="search" (keyup.enter)="loadCourses()" placeholder="Buscar..." class="form-custom" style="max-width: 300px">
          <select [(ngModel)]="levelFilter" (change)="loadCourses()" class="form-custom" style="max-width: 200px">
            <option value="">Todos los niveles</option>
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
          <button class="btn-primary-custom" (click)="loadCourses()">Buscar</button>
        </div>

        <table class="table-custom">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoría</th>
              <th>Nivel</th>
              <th>Instructor</th>
              <th>Precio</th>
              <th>Cupos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let course of courses">
              <td><strong>{{ course.title }}</strong></td>
              <td>{{ course.category }}</td>
              <td>{{ course.level | titlecase }}</td>
              <td>{{ course.instructor }}</td>
              <td>{{ course.price === 0 ? 'Gratis' : ('$' + course.price) }}</td>
              <td>{{ course.currentStudents }}/{{ course.maxStudents }}</td>
              <td>
                <span [class]="course.isActive ? 'badge-role badge-active' : 'badge-role badge-inactive'">
                  {{ course.isActive ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td>
                <a [routerLink]="['/courses/edit', course._id]" class="btn-sm-custom" style="background: #e0e7ff; color: #4f46e5; margin-right: 4px">
                  <i class="fas fa-edit"></i>
                </a>
                <button class="btn-sm-custom" style="background: #fee2e2; color: #dc2626" (click)="deleteCourse(course._id)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="d-flex justify-content-between align-items-center mt-3" *ngIf="pagination">
          <span style="color: #64748b; font-size: 0.9rem">
            Mostrando {{ courses.length }} de {{ pagination.total }} cursos
          </span>
          <div class="d-flex gap-2">
            <button class="btn-sm-custom" style="background: #e2e8f0" [disabled]="pagination.page <= 1" (click)="goToPage(pagination.page - 1)">Anterior</button>
            <span style="padding: 0.35rem 0.75rem; font-size: 0.85rem">Página {{ pagination.page }} de {{ pagination.pages }}</span>
            <button class="btn-sm-custom" style="background: #e2e8f0" [disabled]="pagination.page >= pagination.pages" (click)="goToPage(pagination.page + 1)">Siguiente</button>
          </div>
        </div>
      </div>
    </app-layout>
  `,
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  pagination: any;
  search = '';
  levelFilter = '';

  constructor(private courseService: CourseService) {}

  ngOnInit() { this.loadCourses(); }

  loadCourses(page = 1) {
    const params: any = { page, limit: 10 };
    if (this.search) params.search = this.search;
    if (this.levelFilter) params.level = this.levelFilter;
    this.courseService.getCourses(params).subscribe((res) => {
      this.courses = res.courses;
      this.pagination = res.pagination;
    });
  }

  goToPage(page: number) { this.loadCourses(page); }

  deleteCourse(id: string) {
    if (confirm('¿Eliminar este curso?')) {
      this.courseService.deleteCourse(id).subscribe(() => this.loadCourses());
    }
  }
}
