import React, { useState, useEffect } from 'react'

export default function AuthBar({ onToken }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [mode, setMode] = useState('login')
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => { if (token) onToken(token) }, [token])

  const submit = async (e) => {
    e.preventDefault()
    try {
      if (mode === 'signup') {
        const res = await fetch(`${base}/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) })
        const data = await res.json()
        if (data.access_token) {
          localStorage.setItem('token', data.access_token)
          setToken(data.access_token)
        } else { alert(data.detail || 'Signup failed') }
      } else {
        const form = new URLSearchParams()
        form.set('username', email)
        form.set('password', password)
        const res = await fetch(`${base}/auth/token`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form.toString() })
        const data = await res.json()
        if (data.access_token) {
          localStorage.setItem('token', data.access_token)
          setToken(data.access_token)
        } else { alert(data.detail || 'Login failed') }
      }
    } catch (e) { alert('Network error') }
  }

  const logout = () => { localStorage.removeItem('token'); setToken('') }

  if (token) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sky-100/90 text-sm">Logged in</span>
        <button onClick={logout} className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-sm">Logout</button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      {mode === 'signup' && (
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="px-3 py-1.5 rounded bg-white/10 placeholder-sky-200 text-white text-sm outline-none" />
      )}
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="px-3 py-1.5 rounded bg-white/10 placeholder-sky-200 text-white text-sm outline-none" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="px-3 py-1.5 rounded bg-white/10 placeholder-sky-200 text-white text-sm outline-none" />
      <button className="px-3 py-1.5 rounded bg-sky-500 hover:bg-sky-600 text-white text-sm">{mode==='signup'? 'Create account' : 'Log in'}</button>
      <button type="button" onClick={()=>setMode(mode==='signup'?'login':'signup')} className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-sm">
        {mode==='signup'? 'Have an account?' : 'New here?'}
      </button>
    </form>
  )
}
