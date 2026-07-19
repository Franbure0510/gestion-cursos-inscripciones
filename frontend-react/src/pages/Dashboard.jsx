import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="dashboard">
      <div className="welcome-card">
        <h2>Bienvenido, {user?.name}</h2>
        <p>Panel de control del estudiante</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/courses" className="dash-card">
          <h3>Ver Cursos</h3>
          <p>Explora el catálogo de cursos disponibles e inscríbete</p>
        </Link>
        <div className="dash-card">
          <h3>Mi Perfil</h3>
          <p><strong>DNI:</strong> {user?.dni}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
        <div className="dash-card">
          <h3>Información</h3>
          <p>Sistema de Gestión de Cursos e Inscripciones v1.0</p>
        </div>
      </div>
    </div>
  )
}
