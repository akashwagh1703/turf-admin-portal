import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('admin@turf.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:'100vh'}}>
      <Card style={{minWidth: 360}} className="shadow">
        <Card.Body>
          <h4 className="mb-3 text-center">Admin Login</h4>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            </Form.Group>
            <Button type="submit" className="w-100" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </Button>
            <div className="small text-muted mt-2">
              Try: admin@turf.com / admin123 | manager@turf.com / manager123 | staff@turf.com / staff123
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
