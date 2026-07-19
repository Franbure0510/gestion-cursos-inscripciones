# Decisiones Técnicas - CourseHub

## 1. Monorepo vs Repos Separados
**Decisión:** Repos separados (uno por frontend + uno para backend)

**Justificación:**
- Cada frontend puede desplegarse independientemente en Vercel
- Permite CI/CD separado por proyecto
- Facilita la asignación de responsabilidades por integrante

## 2. Angular para Admin Panel
**Decisión:** Angular 17 con Standalone Components

**Justificación:**
- Completo para aplicaciones empresariales con CRUD extenso
- Guards y Services nativos para autorización
- Formularios reactivos robustos para validación
- Standalone components reduce boilerplate

## 3. React para Portal de Estudiantes
**Decisión:** React 18 con Context API (sin Redux)

**Justificación:**
- Context API suficiente para estado de autenticación e inscripciones
- Funciona como SPA fluida para la experiencia del estudiante
- React Router para navegación client-side
- Componentes funcionales con Hooks

## 4. Next.js para Catálogo Público
**Decisión:** Next.js 14 con App Router, SSR + SSG

**Justificación:**
- SSG para detalle de curso → SEO óptimo, carga rápida
- SSR para catálogo con filtros → contenido dinámico
- ISR (revalidate: 60) para balance entre frescura y rendimiento
- Generación estática de páginas en build time

## 5. JWT vs Sessions
**Decisión:** JWT con httpOnly cookies

**Justificación:**
- Stateless: no requiere sesión en servidor
- Funciona跨 dominios (diferentes frontends)
- httpOnly cookies previenen XSS
- Expiración configurada (7 días)

## 6. MongoDB vs SQL
**Decisión:** MongoDB Atlas con Mongoose ODM

**Justificación:**
- Flexibilidad de esquema para cursos con temario variable
- Referencias con populate para relaciones
- Atlas facilita el despliegue en la nube
- Índices de texto para búsqueda

## 7. Validación
**Decisión:** express-validator en backend + validación nativa en frontends

**Justificación:**
- Backend: seguridad server-side (nunca confiar en el cliente)
- Angular: Formularios reactivos con validadores
- React: validación HTML5 + lógica custom
- Next.js: validación en server components

## 8. Despliegue
**Decisión:** Vercel (frontends) + Render (backend) + MongoDB Atlas

**Justificación:**
- Vercel: deployment automático desde GitHub, HTTPS, CDN
- Render: soporte para Node.js, variables de entorno, auto-deploy
- MongoDB Atlas: tier gratuito suficiente, backup automático

## 9. Seguridad
**Decisión:** Helmet + CORS + Rate Limiting + bcrypt

**Justificación:**
- Helmet: headers de seguridad HTTP
- CORS: solo permite orígenes conocidos
- Rate Limiting: previene abuso (100 req/15min)
- bcrypt: hash de contraseñas con salt

## 10. Estructura de Código
**Decisión:** Arquitectura por capas (controllers, models, routes, middlewares)

**Justificación:**
- Separación de responsabilidades
- Fácil de mantener y escalar
- Testing simplificado por capa
- Convención estándar en Node.js/Express
