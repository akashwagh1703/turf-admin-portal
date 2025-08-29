import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext.jsx'

export default function RequireRole({ roles = [], children }) {
  const { user } = useAuth()

  const userHasRequiredRole = user && roles.length > 0 
    ? roles.some(requiredRole => requiredRole.toLowerCase() === user.role.toLowerCase())
    : false;

  if (!user || (roles.length > 0 && !userHasRequiredRole)) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}
