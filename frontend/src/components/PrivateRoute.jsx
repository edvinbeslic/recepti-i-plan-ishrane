import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function PrivateRoute({ children, adminOnly = false }) {
  const { korisnik, loading } = useAuth()

  if (loading) return <div>Učitavanje...</div>

  if (!korisnik) return <Navigate to="/prijava" />

  if (adminOnly && korisnik.uloga !== 'admin') return <Navigate to="/" />

  return children
}

export default PrivateRoute