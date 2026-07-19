import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { user } = useAuth()

  return (
    <div className="app">
      {user && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  )
}
