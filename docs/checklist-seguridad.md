# Checklist de Seguridad - CourseHub

## HTTPS y Transporte
- [x] Frontends desplegados en Vercel con HTTPS automático
- [x] Backend desplegado en Render con HTTPS automático
- [x] MongoDB Atlas con conexión TLS/SSL

## CORS (Cross-Origin Resource Sharing)
- [x] CORS configurado con orígenes específicos (no wildcard *)
- [x] Solo permitidos: Angular, React, Next.js (Vercel)
- [x] Credentials habilitadas para cookies
- [x] Producción: orígenes de Vercel configurados

## Helmet (HTTP Headers de Seguridad)
- [x] Helmet habilitado en Express
- [x] X-Content-Type-Options: nosniff
- [x] X-Frame-Options: DENY
- [x] X-XSS-Protection habilitado
- [x] Strict-Transport-Security habilitado

## Autenticación y Autorización
- [x] JWT con expiración (7 días)
- [x] Tokens en httpOnly cookies (no accesibles por JS)
- [x] Password hasheado con bcrypt (12 salt rounds)
- [x] Roles: admin y student con autorización por endpoint
- [x] Select: false en password (nunca se retorna en queries)

## Validación de Entradas
- [x] express-validator en todas las rutas
- [x] Validación de campos obligatorios
- [x] Validación de formatos (email, ObjectId)
- [x] Límites de longitud en strings
- [x] JSON body limit: 10kb

## Protección XSS/CSRF
- [x] Helmet XSS Protection
- [x] Input sanitization (trim en modelos)
- [x] No se permite HTML en inputs
- [x] httpOnly cookies previenen XSS token theft
- [x] SameSite: none en cookies (producción)

## Rate Limiting
- [x] Rate limiter global: 100 requests / 15 min
- [x] Mensaje de error claro cuando se excede

## Protección HPP (HTTP Parameter Pollution)
- [x] HPP middleware habilitado

## Variables de Entorno
- [x] .env.example committeado (sin valores reales)
- [x] .env en .gitignore
- [x] No hay secretos hardcoded en el código
- [x] JWT_SECRET configurado por variable de entorno
- [x] MONGODB_URI en variable de entorno

## Errores HTTP
- [x] Respuestas HTTP coherentes (200, 201, 400, 401, 403, 404, 500)
- [x] Mensajes de error comprensibles
- [x] Stack trace solo en desarrollo (NODE_ENV=development)
- [x] Error handler centralizado

## MongoDB Atlas
- [x] Conexión con credenciales de variable de entorno
- [x] IP whitelist configurado en Atlas
- [x] Database user con permisos mínimos necesarios

## Auditoría Lighthouse
- [ ] Performance: > 90
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

## Git y Repositorio
- [x] .gitignore incluye node_modules, dist, .env
- [x] No hay credenciales en el historial de git
- [x] Commits progresivos con mensajes claros
- [x] README completo con instrucciones
