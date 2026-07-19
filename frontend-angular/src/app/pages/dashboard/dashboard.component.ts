import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { AdminService } from '../../services/admin.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent],
  template: `
    <app-layout>
      <div class="page-header">
        <h1>Dashboard</h1>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-md-3">
          <div class="stat-card">
            <div class="icon" style="background: #4f46e5"><i class="fas fa-users"></i></div>
            <div>
              <h3>{{ stats.totalUsers }}</h3>
              <p>Usuarios totales</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="icon" style="background: #16a34a"><i class="fas fa-user-graduate"></i></div>
            <div>
              <h3>{{ stats.totalStudents }}</h3>
              <p>Estudiantes</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="icon" style="background: #f59e0b"><i class="fas fa-book"></i></div>
            <div>
              <h3>{{ totalCourses }}</h3>
              <p>Cursos</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="icon" style="background: #dc2626"><i class="fas fa-file-signature"></i></div>
            <div>
              <h3>{{ totalEnrollments }}</h3>
              <p>Inscripciones</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card-custom">
        <h5 style="margin-bottom: 1rem">Últimas Inscripciones</h5>
        <table class="table-custom" *ngIf="enrollments.length > 0">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Curso</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let e of enrollments">
              <td>{{ e.student?.name }}</td>
              <td>{{ e.course?.title }}</td>
              <td><span class="badge-role badge-active">{{ e.status }}</span></td>
              <td>{{ e.enrolledAt | date:'dd/MM/yyyy' }}</td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="enrollments.length === 0" style="color: #94a3b8">No hay inscripciones aún</p>
      </div>
    </app-layout>
  `,
})
export class DashboardComponent implements OnInit {
  stats = { totalUsers: 0, totalStudents: 0, totalAdmins: 0 };
  totalCourses = 0;
  totalEnrollments = 0;
  enrollments: any[] = [];

  constructor(private adminService: AdminService, private courseService: CourseService) {}

  ngOnInit() {
    this.adminService.getStats().subscribe((res) => (this.stats = res.stats));
    this.courseService.getCourses({ limit: 1 }).subscribe((res) => (this.totalCourses = res.pagination.total));
    this.adminService.getAllEnrollments().subscribe((res) => {
      this.enrollments = res.enrollments.slice(0, 5);
      this.totalEnrollments = res.enrollments.length;
    });
  }
}
