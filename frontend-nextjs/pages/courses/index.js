import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coursehub-api-wu03.onrender.com/api'

export async function getStaticProps() {
  let courses = []
  try {
    const res = await fetch(`${API_URL}/courses`)
    if (res.ok) {
      const data = await res.json()
      courses = data.courses || []
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
        <p style={{ color: '#888' }}>No se pudieron cargar los cursos.</p>
      ) : (
        <div className="catalog-grid">
          {courses.map((course) => (
            <Link href={`/courses/${course._id}`} key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{course.category} · {course.level}</p>
              <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '0.4rem' }}>{course.instructor}</p>
              <div className="meta">
                <span>{course.duration}</span>
                <span>{course.currentStudents}/{course.maxStudents} inscritos</span>
              </div>
              <p style={{ fontWeight: 700, color: course.price === 0 ? '#16a34a' : '#4f46e5', marginTop: '0.5rem' }}>
                {course.price === 0 ? 'Gratis' : `$${course.price}`}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
