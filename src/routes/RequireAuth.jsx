import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../store/AuthContext.jsx'

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}
