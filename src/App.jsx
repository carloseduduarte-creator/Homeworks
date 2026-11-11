import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { Tareas } from './Tareas'
import { Login } from './Login'

const faltanLlaves =
  !import.meta.env.VITE_SUPABASE_URL ||
  String(import.meta.env.VITE_SUPABASE_URL).includes('xxxx')

function App() {
  const [session, setSession] = useState(null)
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (faltanLlaves) return
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })
  }, [])

  const subirAvatar = async (e) => {
    const file = e.target.files[0]
    const { data: { user } } = await supabase.auth.getUser()
    const nombre = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')
    const ruta = `${user.id}/${Date.now()}-${nombre || 'foto'}`

    const { error } = await supabase.storage
      .from('avatars')
      .upload(ruta, file)

    if (error) return alert(error.message)

    const { data } = supabase.storage.from('avatars').getPublicUrl(ruta)
    setUrl(data.publicUrl)
  }

  const salir = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUrl('')
  }

  return (
    <main>
      {faltanLlaves && (
        <p className="aviso">
          Copia la Project URL y la publishable key en <code>.env</code> y reinicia{' '}
          <code>npm run dev</code>.
        </p>
      )}

      {!session ? (
        <Login onSession={setSession} />
      ) : (
        <>
          <header className="card barra">
            <div>
              <h1>Challenge 10</h1>
              <p className="muted">
                {session.user.user_metadata?.nombre
                  ? `${session.user.user_metadata.nombre} · `
                  : ''}
                {session.user.email}
              </p>
            </div>
            <button type="button" className="secondary" onClick={salir}>
              Cerrar sesión
            </button>
          </header>

          <section className="card">
            <h2>Avatar</h2>
            <input type="file" accept="image/*" onChange={subirAvatar} />
            {url && <img src={url} width="160" alt="avatar" />}
          </section>

          <Tareas />
        </>
      )}
    </main>
  )
}

export default App
