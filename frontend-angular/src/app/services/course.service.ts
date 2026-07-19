import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  maxStudents: number;
  currentStudents: number;
  image?: string;
  syllabus: string[];
  isActive: boolean;
  createdAt: string;
}

export interface CourseResponse {
  success: boolean;
  courses: Course[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'https://coursehub-api-wu03.onrender.com/api/courses';

  constructor(private http: HttpClient) {}

  getCourses(params: any = {}): Observable<CourseResponse> {
    const queryParams = new URLSearchParams(params).toString();
    return this.http.get<CourseResponse>(`${this.apiUrl}?${queryParams}`);
  }

  getCourse(id: string): Observable<{ success: boolean; course: Course }> {
    return this.http.get<{ success: boolean; course: Course }>(`${this.apiUrl}/${id}`);
  }

  createCourse(data: Partial<Course>): Observable<{ success: boolean; course: Course }> {
    return this.http.post<{ success: boolean; course: Course }>(this.apiUrl, data);
  }

  updateCourse(id: string, data: Partial<Course>): Observable<{ success: boolean; course: Course }> {
    return this.http.put<{ success: boolean; course: Course }>(`${this.apiUrl}/${id}`, data);
  }

  deleteCourse(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${id}`);
  }
}
