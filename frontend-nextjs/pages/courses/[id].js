import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export async function getStaticPaths() {
  let courses = []
  try {
    const res = await fetch(`${API_URL}/courses`)
    if (res.ok) {
      courses = await res.json()
    }
  } catch {
    // fallback
  }

  const paths = courses.map((c) => ({ params: { id: String(c.id) } }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  let course = null
  try {
    const res = await fetch(`${API_URL}/courses/${params.id}`)
    if (res.ok) {
      course = await res.json()
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
        <p>El curso que buscas no está disponible.</p>
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
        <h2>{course.name}</h2>
        <p className="code">{course.code}</p>
        <p className="description">{course.description}</p>
        <div className="detail-info">
          <div><strong>Docente:</strong> {course.instructor}</div>
          <div><strong>Horario:</strong> {course.schedule}</div>
          <div><strong>Créditos:</strong> {course.credits}</div>
          <div><strong>Cupos:</strong> {course.enrolled} / {course.capacity}</div>
        </div>
      </div>
    </div>
  )
}
