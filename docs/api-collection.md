# Colección de Endpoints - CourseHub API

Base URL: `https://coursehub-api.onrender.com` (producción) o `http://localhost:5000` (desarrollo)

## Autenticación

### POST /api/auth/register
```json
// Request
{
  "name": "Juan Pérez",
  "email": "juan@test.com",
  "password": "123456",
  "role": "student"
}

// Response 201
{
  "success": true,
  "message": "Registro exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "name": "Juan Pérez",
    "email": "juan@test.com",
    "role": "student"
  }
}
```

### POST /api/auth/login
```json
// Request
{
  "email": "admin@coursehub.com",
  "password": "admin123"
}

// Response 200
{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

### GET /api/auth/me
```
Headers: Authorization: Bearer <token>

// Response 200
{
  "success": true,
  "user": { "_id": "...", "name": "...", "email": "...", "role": "..." }
}
```

## Cursos

### GET /api/courses
```
Query params: page, limit, search, category, level

// Response 200
{
  "success": true,
  "courses": [...],
  "pagination": { "page": 1, "limit": 10, "total": 6, "pages": 1 }
}
```

### GET /api/courses/:id
```json
// Response 200
{
  "success": true,
  "course": {
    "_id": "...",
    "title": "Introducción a JavaScript",
    "description": "...",
    "instructor": "Carlos García",
    "category": "Programación",
    "level": "beginner",
    "duration": "40 horas",
    "price": 0,
    "maxStudents": 50,
    "currentStudents": 0,
    "syllabus": ["Variables", "Funciones", "Arrays"],
    "isActive": true
  }
}
```

### POST /api/courses (Admin)
```json
Headers: Authorization: Bearer <admin_token>

// Request
{
  "title": "Nuevo Curso",
  "description": "Descripción del curso",
  "instructor": "Instructor",
  "category": "Frontend",
  "level": "beginner",
  "duration": "20 horas",
  "price": 99.99,
  "maxStudents": 30,
  "syllabus": ["Tema 1", "Tema 2"]
}
```

### PUT /api/courses/:id (Admin)
```json
// Request (parcial)
{ "title": "Título Actualizado", "price": 149.99 }
```

### DELETE /api/courses/:id (Admin)
```json
// Response 200
{ "success": true, "message": "Curso eliminado" }
```

## Inscripciones

### POST /api/enrollments (Student)
```json
Headers: Authorization: Bearer <student_token>

// Request
{ "courseId": "course_id_here" }

// Response 201
{
  "success": true,
  "enrollment": {
    "_id": "...",
    "student": "...",
    "course": { ... },
    "status": "active",
    "enrolledAt": "2024-..."
  }
}
```

### GET /api/enrollments/my (Student)
```json
// Response 200
{
  "success": true,
  "enrollments": [
    {
      "_id": "...",
      "course": { "title": "...", "category": "..." },
      "status": "active",
      "enrolledAt": "2024-..."
    }
  ]
}
```

### PUT /api/enrollments/:id/cancel (Student)
```json
// Response 200
{ "success": true, "message": "Inscripción cancelada" }
```

### GET /api/enrollments/all (Admin)
```json
// Response 200 - Lista todas las inscripciones con populate
```

## Usuarios (Admin)

### GET /api/users
```
Query params: page, limit, search, role
```

### GET /api/users/stats
```json
// Response 200
{
  "success": true,
  "stats": { "totalUsers": 10, "totalStudents": 8, "totalAdmins": 2 }
}
```

### PUT /api/users/:id
```json
// Request
{ "role": "admin" }
```

### DELETE /api/users/:id
```json
// Response 200
{ "success": true, "message": "Usuario eliminado" }
```

## Health Check
### GET /api/health
```json
// Response 200
{ "success": true, "message": "CourseHub API funcionando" }
```
