import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export function Tareas() {
  const [tareas, setTareas] = useState([])
  const [titulo, setTitulo] = useState('')

  const cargar = async () => {
    const { data, error } = await supabase
      .from('tareas')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    else setTareas(data)
  }

  const crear = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('tareas').insert({ titulo })
    if (error) alert(error.message)
    else setTitulo('')
  }

  const completar = async (id, valor) => {
    setTareas((t) => t.map((x) => (x.id === id ? { ...x, completada: valor } : x)))

    const { error } = await supabase
      .from('tareas')
      .update({ completada: valor })
      .eq('id', id)

    if (error) alert(error.message)
  }

  const borrar = (id) => {
    supabase.from('tareas').delete().eq('id', id)
  }

  useEffect(() => {
    cargar()

    const canal = supabase
      .channel('cambios-tareas')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tareas' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTareas((t) => [payload.new, ...t])
          }
          if (payload.eventType === 'UPDATE') {
            setTareas((t) =>
              t.map((x) => (String(x.id) === String(payload.new.id) ? payload.new : x))
            )
          }
          if (payload.eventType === 'DELETE') {
            setTareas((t) => t.filter((x) => String(x.id) !== String(payload.old.id)))
          }
        }
      )
      .subscribe()

    return () => supabase.removeChannel(canal)
  }, [])

  return (
    <section className="card">
      <h2>Tareas</h2>
      <form className="row" onSubmit={crear}>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button>Crear</button>
      </form>

      {tareas.length === 0 ? (
        <p className="muted">Todavía no hay tareas.</p>
      ) : (
        <ul className="lista">
          {tareas.map((tarea) => (
            <li key={tarea.id}>
              <label>
                <input
                  type="checkbox"
                  checked={tarea.completada}
                  onChange={(e) => completar(tarea.id, e.target.checked)}
                />
                <span className={tarea.completada ? 'hecha' : undefined}>{tarea.titulo}</span>
              </label>
              <button type="button" className="danger" onClick={() => borrar(tarea.id)}>
                Borrar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
