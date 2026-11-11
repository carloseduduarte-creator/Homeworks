import { useState } from 'react'
import { supabase } from './lib/supabase'

export function Login({ onSession }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')

  const registrar = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { nombre }
      }
    })

    if (error) return alert(error.message)
    if (data.session) onSession(data.session)
    else alert('Revisa tu correo para confirmar la cuenta')
  }

  const entrar = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return alert(error.message)

    const { data: { session } } = await supabase.auth.getSession()
    onSession(session)
  }

  return (
    <form className="card" onSubmit={entrar}>
      <h1>Challenge 10</h1>
      <p className="muted">Registro e inicio de sesión con Supabase Auth.</p>

      <label>
        Nombre
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ana"
        />
      </label>
      <label>
        Correo
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Contraseña
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <div className="row">
        <button type="submit">Entrar</button>
        <button type="button" className="secondary" onClick={registrar}>
          Crear cuenta
        </button>
      </div>
    </form>
  )
}
