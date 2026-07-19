import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export async function getStaticProps() {
  let courses = []
  try {
    const res = await fetch(`${API_URL}/courses`)
    if (res.ok) {
      courses = await res.json()
    }
  } catch {
    // fallback vacío si la API no está disponible
  }

  return {
    props: { courses },
    revalidate: 60,
  }
}

export default function CourseCatalog({ courses }) {
  return (
    <div className="catalog">
      <h2>Catálogo de Cursos</h2>
      {courses.length === 0 ? (
        <p style={{ color: '#888' }}>No se pudieron cargar los cursos. Verifica que la API esté corriendo.</p>
      ) : (
        <div className="catalog-grid">
          {courses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id} className="course-card">
              <h3>{course.name}</h3>
              <p className="code">{course.code}</p>
              <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '0.4rem' }}>{course.instructor}</p>
              <div className="meta">
                <span>{course.credits} créditos</span>
                <span>{course.enrolled}/{course.capacity} inscritos</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
