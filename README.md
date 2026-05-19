# Gestión de Cursos e Inscripciones - API REST

## Descripción

API REST desarrollada con Node.js, Express y MongoDB para gestionar cursos e inscripciones académicas. Implementa autenticación JWT y control de roles.

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB (v4.4 o superior)
- npm o yarn

## Instalación

1. Clonar o extraer el proyecto
2. Ejecutar en la raíz del proyecto:

```bash
npm install
```

## Configuración de Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/gestion_cursos
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=24h
NODE_ENV=development
```

## Ejecución

```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## Estructura del Proyecto

```
src/
├── config/
│   └── db.js              # Conexión a MongoDB
├── models/
│   ├── user.model.js      # Modelo de usuario
│   ├── course.model.js    # Modelo de curso
│   └── enrollment.model.js # Modelo de inscripción
├── controllers/
│   ├── user.controller.js
│   ├── course.controller.js
│   └── enrollment.controller.js
├── routes/
│   ├── user.routes.js
│   ├── course.routes.js
│   └── enrollment.routes.js
├── middlewares/
│   ├── auth.middleware.js # Autenticación JWT
│   └── role.middleware.js # Control de roles
├── app.js                 # Archivo principal
└── .env                   # Variables de entorno
```

## Endpoints

### Usuarios

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|--------------|---------------|
| POST | /api/users/register | Registrar usuario | No |
| POST | /api/users/login | Iniciar sesión | No |
| GET | /api/users/profile | Ver perfil | Sí |
| GET | /api/users | Listar usuarios | Sí (Admin) |
| GET | /api/users/:id | Ver usuario por ID | Sí |
| PUT | /api/users/:id | Actualizar usuario | Sí (Admin/Teacher) |
| DELETE | /api/users/:id | Eliminar usuario | Sí (Admin) |

### Cursos

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|--------------|---------------|
| GET | /api/courses | Listar cursos | Sí |
| GET | /api/courses/:id | Ver curso por ID | Sí |
| POST | /api/courses | Crear curso | Sí (Admin/Teacher) |
| PUT | /api/courses/:id | Actualizar curso | Sí (Admin/Teacher) |
| DELETE | /api/courses/:id | Eliminar curso | Sí (Admin) |
| GET | /api/courses/teacher/my-courses | Cursos del docente | Sí (Teacher) |

### Inscripciones

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|--------------|---------------|
| GET | /api/enrollments | Listar inscripciones | Sí (Admin/Teacher) |
| GET | /api/enrollments/:id | Ver inscripción por ID | Sí |
| POST | /api/enrollments | Crear inscripción | Sí (Student) |
| PUT | /api/enrollments/:id | Actualizar inscripción | Sí (Admin/Teacher) |
| DELETE | /api/enrollments/:id | Eliminar inscripción | Sí (Admin) |
| GET | /api/enrollments/my-enrollments | Mis inscripciones | Sí (Student) |

## Roles de Usuario

- **admin**: Acceso completo
- **teacher**: Gestiona cursos, ve inscripciones
- **student**: Se inscribe en cursos, ve sus inscripciones

## Ejemplo de Uso

### Registrar usuario estudiante:
```json
POST /api/users/register
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "role": "student"
}
```

### Iniciar sesión:
```json
POST /api/users/login
{
  "email": "juan@example.com",
  "password": "password123"
}
```

### Crear curso (usar token en header):
```json
POST /api/courses
Authorization: Bearer <token>
{
  "title": "Introduction to Programming",
  "description": "Learn programming basics",
  "duration": 40,
  "teacher": "id_del_docente",
  "schedule": "Monday 10:00",
  "maxStudents": 30
}
```

### Inscribirse en un curso:
```json
POST /api/enrollments
Authorization: Bearer <token>
{
  "courseId": "id_del_curso"
}
```

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB / Mongoose
- JSON Web Token (JWT)
- bcryptjs
- cors
- dotenv

## Autores

Equipo de Desarrollo - Proyecto Académico