import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coursehub-api-wu03.onrender.com/api'

export async function getStaticPaths() {
  let courses = []
  try {
    const res = await fetch(`${API_URL}/courses`)
    if (res.ok) {
      const data = await res.json()
      courses = data.courses || []
    }
  } catch {
    // fallback
  }

  const paths = courses.map((c) => ({ params: { id: String(c._id) } }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  let course = null
  try {
    const res = await fetch(`${API_URL}/courses/${params.id}`)
    if (res.ok) {
      const data = await res.json()
      course = data.course || data
    }
  } catch {
    // fallback
  }

  if (!course) {
    return { notFound: true }
  }

  return {
    props: { course },
    revalidate: 60,
  }
}

export default function CourseDetail({ course }) {
  if (!course) {
    return (
      <div className="not-found">
        <h2>Curso no encontrado</h2>
        <Link href="/courses" className="back-btn" style={{ marginTop: '1rem', display: 'inline-block' }}>
          ← Volver al catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="detail-page">
      <Link href="/courses" className="back-btn">← Volver al catálogo</Link>
      <div className="detail-card">
        <h2>{course.title}</h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{course.category} · {course.level}</p>
        <p className="description">{course.description}</p>
        <div className="detail-info">
          <div><strong>Instructor:</strong> {course.instructor}</div>
          <div><strong>Duración:</strong> {course.duration}</div>
          <div><strong>Estudiantes:</strong> {course.currentStudents} / {course.maxStudents}</div>
          <div><strong>Precio:</strong> {course.price === 0 ? 'Gratis' : `$${course.price}`}</div>
        </div>
        {course.syllabus && course.syllabus.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3>Temario</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              {course.syllabus.map((item, i) => (
                <li key={i} style={{ marginBottom: '0.3rem' }}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
