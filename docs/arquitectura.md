# Diagrama de Arquitectura - CourseHub

## Arquitectura General

```
                    ┌──────────────────────────────────┐
                    │         CourseHub                 │
                    └──────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         FRONTENDS                               │
├───────────────────┬───────────────────┬─────────────────────────┤
│                   │                   │                         │
│  ┌─────────────┐  │  ┌─────────────┐  │  ┌───────────────────┐  │
│  │   Angular   │  │  │   React     │  │  │    Next.js        │  │
│  │             │  │  │             │  │  │                   │  │
│  │ Admin Panel │  │  │  Student    │  │  │  Public Catalog   │  │
│  │             │  │  │  Portal     │  │  │  (SSR/SSG)       │  │
│  │ - Dashboard │  │  │             │  │  │                   │  │
│  │ - CRUD      │  │  │ - Login     │  │  │ - Home (SSR)     │  │
│  │ - Users     │  │  │ - Register  │  │  │ - Catalog (SSR)  │  │
│  │ - Courses   │  │  │ - Catalog   │  │  │ - Detail (SSG)   │  │
│  │             │  │  │ - Detail    │  │  │                   │  │
│  │ Guards      │  │  │ - Enroll    │  │  │ getStaticParams   │  │
│  │ Interceptor │  │  │ - Dashboard │  │  │ force-dynamic     │  │
│  │             │  │  │             │  │  │ revalidate        │  │
│  │ :4200       │  │  │ Context API │  │  │ :3001             │  │
│  └──────┬──────┘  │  └──────┬──────┘  │  └────────┬──────────┘  │
│         │         │         │         │           │              │
└─────────┼─────────┴─────────┼─────────┴───────────┼──────────────┘
          │                   │                     │
          └───────────────────┼─────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │      CORS         │
                    │  Restricted       │
                    └─────────┬─────────┘
                              │
┌─────────────────────────────┼───────────────────────────────────┐
│                         BACKEND                                 │
│                    ┌────────▼────────┐                           │
│                    │  Express.js     │                           │
│                    │  + Helmet       │                           │
│                    │  + Rate Limit   │                           │
│                    │  + Validation   │                           │
│                    └────────┬────────┘                           │
│                             │                                   │
│    ┌────────────────────────┼────────────────────────┐          │
│    │                        │                        │          │
│  ┌─▼──────────┐  ┌─────────▼──────────┐  ┌──────────▼───────┐  │
│  │   Auth     │  │    Courses         │  │   Enrollments    │  │
│  │ Controller │  │    Controller      │  │   Controller     │  │
│  │            │  │                    │  │                  │  │
│  │ - Register │  │ - CRUD             │  │ - Enroll         │  │
│  │ - Login    │  │ - Search/Filter    │  │ - My Enrollments │  │
│  │ - Logout   │  │ - Pagination       │  │ - Cancel         │  │
│  │ - Me       │  │ - Categories       │  │ - All (Admin)    │  │
│  └─┬──────────┘  └─────────┬──────────┘  └──────────┬───────┘  │
│    │                       │                        │          │
│  ┌─▼───────────────────────▼────────────────────────▼───────┐   │
│  │                   MIDDLEWARES                             │   │
│  │  - JWT Auth    - Role Authorization    - Validation      │   │
│  │  - Error Handler - Rate Limiter                         │   │
│  └───────────────────────────┬──────────────────────────────┘   │
│                              │                                  │
│  ┌───────────────────────────▼──────────────────────────────┐   │
│  │                    MODELS (Mongoose)                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐       │   │
│  │  │  User    │  │  Course  │  │   Enrollment     │       │   │
│  │  │          │  │          │  │                   │       │   │
│  │  │ - name   │  │ - title  │  │ - student (ref)  │       │   │
│  │  │ - email  │  │ - desc   │  │ - course (ref)   │       │   │
│  │  │ - pass   │  │ - instr  │  │ - status         │       │   │
│  │  │ - role   │  │ - cat    │  │ - enrolledAt     │       │   │
│  │  └──────────┘  │ - level  │  └──────────────────┘       │   │
│  │                │ - price  │                              │   │
│  │                └──────────┘                              │   │
│  └───────────────────────────┬──────────────────────────────┘   │
│                              │                                  │
│                    ┌─────────▼─────────┐                        │
│                    │   :5000           │                        │
│                    └─────────┬─────────┘                        │
└──────────────────────────────┼──────────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   MongoDB Atlas     │
                    │                     │
                    │  ┌───────────────┐  │
                    │  │  coursehub    │  │
                    │  │               │  │
                    │  │  users        │  │
                    │  │  courses      │  │
                    │  │  enrollments  │  │
                    │  └───────────────┘  │
                    └─────────────────────┘
```

## Modelo de Datos

```
┌──────────────────────┐
│        User          │
├──────────────────────┤
│ _id: ObjectId        │
│ name: String         │
│ email: String (uniq) │
│ password: String     │
│ role: enum           │
│   - admin            │
│   - student          │
│ avatar: String       │
│ createdAt: Date      │
└──────────────────────┘

┌──────────────────────┐
│       Course         │
├──────────────────────┤
│ _id: ObjectId        │
│ title: String        │
│ description: String  │
│ instructor: String   │
│ category: String     │
│ level: enum          │
│   - beginner         │
│   - intermediate     │
│   - advanced         │
│ duration: String     │
│ price: Number        │
│ maxStudents: Number  │
│ currentStudents: Num │
│ syllabus: [String]   │
│ isActive: Boolean    │
│ createdAt: Date      │
└──────────────────────┘

┌──────────────────────┐
│     Enrollment       │
├──────────────────────┤
│ _id: ObjectId        │
│ student: ObjectId ───┼──→ User
│ course: ObjectId ────┼──→ Course
│ status: enum         │
│   - active           │
│   - completed        │
│   - cancelled        │
│ enrolledAt: Date     │
│ completedAt: Date    │
└──────────────────────┘
```

## Flujo de Autenticación

```
┌──────────┐    POST /auth/login    ┌──────────┐
│  Client  │ ──────────────────────→ │  Server  │
│          │                         │          │
│          │ ←────────────────────── │          │
│          │   {token, user}         │          │
└────┬─────┘                         └──────────┘
     │
     │  Authorization: Bearer <token>
     │ ──────────────────────────────→ 
     │                         ┌──────────┐
     │                         │  Verify  │
     │                         │  JWT     │
     │                         │  Check   │
     │                         │  Role    │
     │                         └──────────┘
     │                              │
     │  Request + user context      │
     │ ←────────────────────────────│
     │                              │
     ▼                         Controller
```

## Estrategias de Rendering (Next.js)

| Página | Estrategia | Justificación |
|--------|-----------|---------------|
| / (Home) | SSR (force-dynamic) | Contenido dinámico, datos frescos |
| /courses | SSR (force-dynamic) | Búsqueda y filtros en tiempo real |
| /courses/[id] | SSG + ISR (revalidate: 60) | SEO, rendimiento, revalidación periódica |
