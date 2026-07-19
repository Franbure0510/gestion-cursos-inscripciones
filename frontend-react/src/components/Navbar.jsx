import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">Portal Estudiante</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Inicio</Link></li>
        <li><Link to="/courses">Cursos</Link></li>
      </ul>
      <div className="navbar-user">
        <span>{user?.name}</span>
        <button onClick={handleLogout} className="btn-logout">Cerrar sesión</button>
      </div>
    </nav>
  )
}
