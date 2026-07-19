import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface Enrollment {
  _id: string;
  student: { _id: string; name: string; email: string };
  course: { _id: string; title: string; category: string };
  status: string;
  enrolledAt: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getUsers(params: any = {}): Observable<{ success: boolean; users: UserItem[]; pagination: any }> {
    const qp = new URLSearchParams(params).toString();
    return this.http.get<any>(`${this.apiUrl}/users?${qp}`);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/stats`);
  }

  getAllEnrollments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/enrollments/all`);
  }
}
