import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/enrollments/my-enrollments')
      .then((res) => setEnrollments(res.data || []))
      .catch(() => setError('Error al cargar inscripciones'))
      .finally(() => setLoading(false))
  }, [])

  async function handleWithdraw(enrollmentId) {
    if (!confirm('¿Estás seguro de que deseas retirarte de este curso?')) return
    try {
      await api.delete(`/enrollments/${enrollmentId}`)
      setEnrollments((prev) => prev.filter((e) => e._id !== enrollmentId))
    } catch (err) {
      alert(err.response?.data?.message || 'Error al retirarse del curso')
    }
  }

  if (loading) return <div className="loading">Cargando inscripciones...</div>
  if (error) return <div className="error-msg">{error}</div>

  return (
    <div className="courses-page">
      <h2>Mis Cursos Inscritos</h2>
      {enrollments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
          <p>No estás inscrito en ningún curso aún.</p>
          <Link to="/courses" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block', padding: '0.5rem 1.5rem', textDecoration: 'none', borderRadius: '8px' }}>
            Ver catálogo de cursos
          </Link>
        </div>
      ) : (
        <div className="courses-grid">
          {enrollments.map((enrollment) => (
            <div key={enrollment._id} className="course-card" style={{ cursor: 'default' }}>
              <h3>{enrollment.course?.title || 'Curso'}</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                {enrollment.course?.category} · {enrollment.course?.level}
              </p>
              <p>{enrollment.course?.instructor}</p>
              <div className="course-meta">
                <span>{enrollment.course?.duration}</span>
                <span style={{ color: enrollment.status === 'active' ? '#16a34a' : '#ef4444' }}>
                  {enrollment.status === 'active' ? 'Activa' : enrollment.status}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
                Inscrito: {new Date(enrollment.enrollmentDate).toLocaleDateString('es-PE')}
              </p>
              <button
                onClick={() => handleWithdraw(enrollment._id)}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  width: '100%'
                }}
              >
                Retirarme del curso
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
