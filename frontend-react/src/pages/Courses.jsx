import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/courses')
      .then((res) => setCourses(res.data.courses || []))
      .catch(() => setError('Error al cargar los cursos'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading">Cargando cursos...</div>
  if (error) return <div className="error-msg">{error}</div>

  return (
    <div className="courses-page">
      <h2>Catálogo de Cursos</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <Link to={`/courses/${course._id}`} key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{course.category} · {course.level}</p>
            <p>{course.instructor}</p>
            <div className="course-meta">
              <span>{course.duration}</span>
              <span>{course.currentStudents}/{course.maxStudents} inscritos</span>
            </div>
            <p style={{ fontWeight: 700, color: course.price === 0 ? '#16a34a' : '#4f46e5', marginTop: '0.5rem' }}>
              {course.price === 0 ? 'Gratis' : `$${course.price}`}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
