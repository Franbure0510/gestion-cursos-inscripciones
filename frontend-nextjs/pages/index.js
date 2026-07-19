import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="hero">
        <h2>Bienvenidos a la Oferta Académica</h2>
        <p>Explora nuestros cursos y programas diseñados para tu desarrollo profesional.</p>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Catálogo de Cursos</h3>
          <p>Encuentra una amplia variedad de cursos en diferentes áreas del conocimiento.</p>
        </div>
        <div className="feature-card">
          <h3>Docentes Calificados</h3>
          <p>Profesores con amplia experiencia académica y profesional en cada materia.</p>
        </div>
        <div className="feature-card">
          <h3>Modalidad Presencial</h3>
          <p>Clases diseñadas para brindar una experiencia de aprendizaje integral y práctica.</p>
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link href="/courses" style={{
          display: 'inline-block',
          padding: '0.8rem 2rem',
          background: '#1a1a2e',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 500,
        }}>
          Ver todos los cursos
        </Link>
      </div>

      <section className="features" style={{ marginTop: '3rem' }}>
        <div className="feature-card">
          <h3>Portal del Estudiante</h3>
          <p>
            Si eres estudiante, ingresa al portal para inscribirte en los cursos y gestionar tu
            información académica.
          </p>
        </div>
        <div className="feature-card">
          <h3>¿Por qué estudiar con nosotros?</h3>
          <p>
            Formación de calidad con enfoque en competencias profesionales y certificaciones
            reconocidas en el sector.
          </p>
        </div>
      </section>
    </>
  )
}
