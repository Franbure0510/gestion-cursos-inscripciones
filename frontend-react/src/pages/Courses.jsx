import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/courses')
      .then((res) => setCourses(res.data))
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
          <Link to={`/courses/${course.id}`} key={course.id} className="course-card">
            <h3>{course.name}</h3>
            <p className="course-code">{course.code}</p>
            <p className="course-instructor">{course.instructor}</p>
            <div className="course-meta">
              <span>{course.credits} créditos</span>
              <span>{course.enrolled}/{course.capacity} inscritos</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
