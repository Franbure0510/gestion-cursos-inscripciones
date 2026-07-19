# CourseHub - Plataforma de Gestión de Cursos e Inscripciones

## Descripción
CourseHub es una plataforma web completa para la gestión de cursos e inscripciones. Permite a los estudiantes explorar catálogos de cursos, inscribirse y gestionar sus inscripciones, mientras que los administradores gestionan cursos, usuarios y el sistema completo.

## Problema
Las instituciones educativas necesitan una plataforma centralizada para gestionar cursos, inscripciones y seguimiento estudiantil de forma eficiente y moderna.

## Objetivos
- Permitir a los estudiantes registrarse, buscar cursos e inscribirse
- Brindar a los administradores control total sobre cursos y usuarios
- Demostrar integración completa de frontend, backend, persistencia y autenticación

## Arquitectura
```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Angular       │  │   React         │  │   Next.js       │
│   (Admin Panel) │  │  (Estudiantes)  │  │  (Catálogo)     │
│   Puerto 4200   │  │  Puerto 3000    │  │  Puerto 3001    │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Node.js/Express │
                    │   API REST        │
                    │   Puerto 5000     │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │   MongoDB Atlas   │
                    │   Mongoose ODM    │
                    └───────────────────┘
```

## Tecnologías

| Capa | Tecnología | Evidencia |
|------|-----------|-----------|
| Backend | Node.js, Express, JWT, bcrypt | API REST modular, endpoints probados |
| Base de datos | MongoDB Atlas, Mongoose | Datos persistidos en la nube |
| Admin Panel | Angular 17, TypeScript | CRUD funcionando, código tipado |
| Portal Estudiantes | React 18, Context API | Flujos de login, catálogo, inscripción |
| Catálogo Público | Next.js 14, SSR/SSG | Rutas con renderizado del lado del servidor |
| Despliegue | Vercel + Render | URLs públicas operativas |

## Integrantes
- Francois Larrabure Quinones (6369)

## Instalación

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Configurar variables
npm run seed          # Cargar datos de prueba
npm run dev           # Servidor en http://localhost:5000
```

### Frontend Angular (Admin)
```bash
cd frontend-angular
npm install
ng serve              # Servidor en http://localhost:4200
```

### Frontend React (Estudiantes)
```bash
cd frontend-react
npm install
npm start             # Servidor en http://localhost:3000
```

### Frontend Next.js (Catálogo)
```bash
cd frontend-nextjs
npm install
npm run dev           # Servidor en http://localhost:3001
```

## Variables de Entorno

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/coursehub
JWT_SECRET=tu_jwt_secret_aqui
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_ANGULAR_URL=http://localhost:4200
FRONTEND_REACT_URL=http://localhost:3000
FRONTEND_NEXTJS_URL=http://localhost:3001
```

### Frontend Next.js (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Credenciales de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | admin@coursehub.com | admin123 |
| Estudiante | student@coursehub.com | student123 |

## Endpoints de la API

### Autenticación
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | /api/users/register | Registrar usuario | No |
| POST | /api/users/login | Iniciar sesión | No |
| GET | /api/users/profile | Obtener perfil | Sí |

### Cursos
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | /api/courses | Listar cursos (paginado, filtrable) | No |
| GET | /api/courses/:id | Detalle de curso | No |
| GET | /api/courses/categories | Listar categorías | No |
| POST | /api/courses | Crear curso | Admin/Teacher |
| PUT | /api/courses/:id | Actualizar curso | Admin/Teacher |
| DELETE | /api/courses/:id | Eliminar curso | Admin |

### Inscripciones
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | /api/enrollments | Inscribirse a un curso | Student |
| GET | /api/enrollments/my-enrollments | Mis inscripciones | Student |
| GET | /api/enrollments | Todas las inscripciones | Admin/Teacher |

### Usuarios (Admin)
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | /api/users | Listar usuarios | Admin |
| GET | /api/users/:id | Obtener usuario | Sí |
| PUT | /api/users/:id | Actualizar usuario | Admin |
| DELETE | /api/users/:id | Eliminar usuario | Admin |

## URLs Desplegadas
- Backend API: `https://coursehub-api-wu03.onrender.com`
- Frontend Angular (Admin): `https://gestion-cursos-inscripciones-yp2y-theta.vercel.app`
- Frontend React (Estudiantes): `https://gestion-cursos-inscripciones-ltqz.vercel.app`
- Frontend Next.js (Catálogo): `https://gestion-cursos-inscripciones.vercel.app`

## Flujo Demostrable
1. **Registro** → El estudiante crea una cuenta
2. **Inicio de sesión** → Se autentica con JWT
3. **Catálogo** → Explora cursos (Next.js con SSR)
4. **Detalle** → Ve información completa del curso
5. **Inscripción** → Se inscribe en un curso
6. **Panel estudiante** → Ve sus inscripciones (React)
7. **Panel admin** → Gestiona cursos y usuarios (Angular)
8. **Persistencia** → Todo se guarda en MongoDB Atlas

## Seguridad
- [x] Helmet para headers de seguridad HTTP
- [x] CORS restringido a orígenes conocidos
- [x] Rate Limiting (100 req/15 min)
- [x] JWT con expiración y httpOnly cookies
- [x] bcrypt con 12 salt rounds
- [x] Validación de entradas en modelos Mongoose
- [x] Respuestas HTTP coherentes
- [x] Variables de entorno (sin secretos en código)

## Video de Exposición
[Enlace al video en YouTube](https://youtu.be/D7FSfd7HcmU)

## Evidencia de Progreso
- **PA1**: SPA Angular para gestión de cursos (frontend only)
- **PA2**: Backend API REST con MongoDB
- **PA4**: Integración Full-stack (React + Next.js + Express)
- **Evaluación Final**: Angular Admin + React Portal + Next.js Catálogo + Backend mejorado
