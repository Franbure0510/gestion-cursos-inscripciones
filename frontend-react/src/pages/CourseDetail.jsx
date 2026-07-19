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
      const res = await api.post(`/courses/${id}/enroll`)
      setEnrollMsg(res.data.message)
      setCourse((prev) => ({ ...prev, enrolled: prev.enrolled + 1 }))
    } catch (err) {
      setEnrollMsg(err.response?.data?.error || 'Error al inscribirse')
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
        <h2>{course.name}</h2>
        <p className="course-code">{course.code}</p>
        <p className="description">{course.description}</p>
        <div className="detail-info">
          <div><strong>Docente:</strong> {course.instructor}</div>
          <div><strong>Horario:</strong> {course.schedule}</div>
          <div><strong>Créditos:</strong> {course.credits}</div>
          <div><strong>Cupos:</strong> {course.enrolled} / {course.capacity}</div>
        </div>
        <button onClick={handleEnroll} disabled={enrolling || course.enrolled >= course.capacity} className="btn-primary">
          {enrolling ? 'Inscribiendo...' : course.enrolled >= course.capacity ? 'Curso lleno' : 'Inscribirme'}
        </button>
        {enrollMsg && <div className={enrollMsg.includes('exitosa') ? 'success-msg' : 'error-msg'}>{enrollMsg}</div>}
      </div>
    </div>
  )
}
