import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [enrolling, setEnrolling] = useState(false)
  const [enrollMsg, setEnrollMsg] = useState('')

  useEffect(() => {
    api.get(`/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch(() => setError('Error al cargar el curso'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleEnroll() {
    setEnrolling(true)
    setEnrollMsg('')
    try {
      const res = await api.post('/enrollments', { courseId: id })
      setEnrollMsg('Inscripción exitosa')
      setCourse((prev) => ({ ...prev, currentStudents: (prev.currentStudents || 0) + 1 }))
    } catch (err) {
      setEnrollMsg(err.response?.data?.message || 'Error al inscribirse')
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) return <div className="loading">Cargando curso...</div>
  if (error) return <div className="error-msg">{error}</div>
  if (!course) return <div className="error-msg">Curso no encontrado</div>

  return (
    <div className="course-detail">
      <button onClick={() => navigate('/courses')} className="btn-back">← Volver a cursos</button>
      <div className="detail-card">
        <h2>{course.title}</h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{course.category} · {course.level}</p>
        <p className="description">{course.description}</p>
        <div className="detail-info">
          <div><strong>Instructor:</strong> {course.instructor}</div>
          <div><strong>Duración:</strong> {course.duration}</div>
          <div><strong>Cupos:</strong> {course.currentStudents} / {course.maxStudents}</div>
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
        <button onClick={handleEnroll} disabled={enrolling || course.currentStudents >= course.maxStudents} className="btn-primary" style={{ marginTop: '1.5rem' }}>
          {enrolling ? 'Inscribiendo...' : course.currentStudents >= course.maxStudents ? 'Curso lleno' : 'Inscribirme'}
        </button>
        {enrollMsg && <div className={enrollMsg.includes('exitosa') ? 'success-msg' : 'error-msg'}>{enrollMsg}</div>}
      </div>
    </div>
  )
}
