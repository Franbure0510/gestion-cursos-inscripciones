import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LayoutComponent],
  template: `
    <app-layout>
      <div class="page-header">
        <h1>{{ isEdit ? 'Editar Curso' : 'Nuevo Curso' }}</h1>
      </div>

      <div class="card-custom" style="max-width: 700px">
        <div *ngIf="error" class="alert-custom alert-error">{{ error }}</div>
        <div *ngIf="success" class="alert-custom alert-success">{{ success }}</div>

        <form (ngSubmit)="onSubmit()" class="form-custom">
          <div class="row g-3">
            <div class="col-12">
              <label>Título *</label>
              <input type="text" [(ngModel)]="form.title" name="title" required>
            </div>
            <div class="col-12">
              <label>Descripción *</label>
              <textarea [(ngModel)]="form.description" name="description" rows="3" required></textarea>
            </div>
            <div class="col-md-6">
              <label>Instructor *</label>
              <input type="text" [(ngModel)]="form.instructor" name="instructor" required>
            </div>
            <div class="col-md-6">
              <label>Categoría *</label>
              <input type="text" [(ngModel)]="form.category" name="category" required>
            </div>
            <div class="col-md-4">
              <label>Nivel</label>
              <select [(ngModel)]="form.level" name="level">
                <option value="beginner">Principiante</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
              </select>
            </div>
            <div class="col-md-4">
              <label>Duración *</label>
              <input type="text" [(ngModel)]="form.duration" name="duration" placeholder="ej: 40 horas" required>
            </div>
            <div class="col-md-4">
              <label>Precio *</label>
              <input type="number" [(ngModel)]="form.price" name="price" min="0" step="0.01" required>
            </div>
            <div class="col-md-6">
              <label>Cupo Máximo *</label>
              <input type="number" [(ngModel)]="form.maxStudents" name="maxStudents" min="1" required>
            </div>
            <div class="col-md-6">
              <label>Activo</label>
              <select [(ngModel)]="form.isActive" name="isActive">
                <option [ngValue]="true">Sí</option>
                <option [ngValue]="false">No</option>
              </select>
            </div>
            <div class="col-12">
              <label>Temario (separar por comas)</label>
              <input type="text" [(ngModel)]="syllabusInput" name="syllabus" placeholder="Tema 1, Tema 2, Tema 3">
            </div>
          </div>
          <div class="d-flex gap-2 mt-4">
            <button type="submit" class="btn-primary-custom" [disabled]="loading">
              {{ loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear Curso') }}
            </button>
            <a routerLink="/courses" class="btn-sm-custom" style="background: #e2e8f0; padding: 0.5rem 1.25rem; text-decoration: none; color: #475569">Cancelar</a>
          </div>
        </form>
      </div>
    </app-layout>
  `,
})
export class CourseFormComponent implements OnInit {
  isEdit = false;
  courseId = '';
  loading = false;
  error = '';
  success = '';
  syllabusInput = '';
  form: any = {
    title: '',
    description: '',
    instructor: '',
    category: '',
    level: 'beginner',
    duration: '',
    price: 0,
    maxStudents: 30,
    isActive: true,
  };

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];
    if (this.courseId) {
      this.isEdit = true;
      this.courseService.getCourse(this.courseId).subscribe((res) => {
        this.form = { ...res.course };
        this.syllabusInput = res.course.syllabus?.join(', ') || '';
      });
    }
  }

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.form.syllabus = this.syllabusInput.split(',').map((s: string) => s.trim()).filter(Boolean);

    const obs = this.isEdit
      ? this.courseService.updateCourse(this.courseId, this.form)
      : this.courseService.createCourse(this.form);

    obs.subscribe({
      next: () => {
        this.success = this.isEdit ? 'Curso actualizado' : 'Curso creado';
        this.loading = false;
        if (!this.isEdit) {
          setTimeout(() => this.router.navigate(['/courses']), 1000);
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar';
        this.loading = false;
      },
    });
  }
}
