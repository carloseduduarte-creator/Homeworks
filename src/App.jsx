import { useEffect, useMemo, useState } from 'react'
import { Graph as D3Graph } from 'react-d3-graph'
import Graph from './Graph'

const ciudadesIniciales = [{ nombre: 'Cali' }, { nombre: 'Bogota' }, { nombre: 'Medellin' }]

const personasIniciales = [
  { nombre: 'Ana', edad: 20, ciudad: 'Cali' },
  { nombre: 'Luis', edad: 22, ciudad: 'Bogota' },
  { nombre: 'Marta', edad: 19, ciudad: 'Cali' },
]

function armarGrafo(ciudades, personas) {
  const grafo = new Graph()
  ciudades.forEach((ciudad) => grafo.addNode(ciudad.nombre))
  personas.forEach((persona) => {
    grafo.addNode(persona.nombre)
    grafo.addEdge(persona.nombre, persona.ciudad)
  })
  return grafo
}

function configDelGrafo(ancho) {
  return {
    directed: false,
    staticGraphWithDrag: true,
    height: 420,
    width: ancho,
    nodeHighlightBehavior: true,
    node: {
      color: '#1f6b4a',
      size: 360,
      fontSize: 14,
      highlightStrokeColor: '#1c2430',
    },
    link: {
      color: '#c4b8a8',
      highlightColor: '#1f6b4a',
    },
  }
}

function App() {
  const [ciudades, setCiudades] = useState(ciudadesIniciales)
  const [personas, setPersonas] = useState(personasIniciales)
  const [ciudadSel, setCiudadSel] = useState('Cali')
  const [nombreCiudad, setNombreCiudad] = useState('')
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState('')
  const [ciudadPersona, setCiudadPersona] = useState('Cali')
  const [ancho, setAncho] = useState(640)

  useEffect(() => {
    const medir = () => {
      setAncho(Math.max(320, Math.min(900, document.documentElement.clientWidth - 64)))
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [])

  const grafo = useMemo(() => armarGrafo(ciudades, personas), [ciudades, personas])

  const data = {
    nodes: grafo.nodes.map((id, i) => {
      const angulo = (2 * Math.PI * i) / grafo.nodes.length - Math.PI / 2
      const radio = Math.min(ancho, 420) / 2 - 70
      return {
        id,
        x: ancho / 2 + Math.cos(angulo) * radio,
        y: 210 + Math.sin(angulo) * radio,
        color: ciudades.some((c) => c.nombre === id) ? '#3d7ea6' : '#1f6b4a',
      }
    }),
    links: personas.map((persona) => ({
      source: persona.nombre,
      target: persona.ciudad,
    })),
  }

  const vecinos = ciudadSel && grafo.adjList[ciudadSel] ? grafo.adjList[ciudadSel] : []
  const vivenAhi = personas.filter((persona) => vecinos.includes(persona.nombre))

  const agregarCiudad = (e) => {
    e.preventDefault()
    const limpio = nombreCiudad.trim()
    if (!limpio) return
    if (grafo.searchNode(limpio)) return alert('Ese nombre ya existe')
    setCiudades([...ciudades, { nombre: limpio }])
    setCiudadSel(limpio)
    setCiudadPersona(limpio)
    setNombreCiudad('')
  }

  const agregarPersona = (e) => {
    e.preventDefault()
    const limpio = nombre.trim()
    if (!limpio || !ciudadPersona) return
    if (grafo.searchNode(limpio)) return alert('Ese nombre ya existe')
    setPersonas([...personas, { nombre: limpio, edad: Number(edad), ciudad: ciudadPersona }])
    setNombre('')
    setEdad('')
  }

  const quitarCiudad = (nombreCiudad) => {
    setCiudades(ciudades.filter((c) => c.nombre !== nombreCiudad))
    setPersonas(personas.filter((p) => p.ciudad !== nombreCiudad))
    if (ciudadSel === nombreCiudad) setCiudadSel('')
    if (ciudadPersona === nombreCiudad) setCiudadPersona('')
  }

  const quitarPersona = (nombrePersona) => {
    setPersonas(personas.filter((p) => p.nombre !== nombrePersona))
  }

  return (
    <main>
      <header className="card">
        <h1>Challenge 11</h1>
        <p className="muted">Grafo de personas y ciudades. La línea une a cada persona con su ciudad.</p>
      </header>

      <section className="card grafo">
        {grafo.isEmpty() ? (
          <p className="muted">El grafo está vacío.</p>
        ) : (
          <D3Graph
            id="grafo-amigos"
            key={`${ancho}-${grafo.nodes.join('-')}`}
            data={data}
            config={configDelGrafo(ancho)}
            onClickNode={(id) => {
              if (ciudades.some((c) => c.nombre === id)) setCiudadSel(id)
            }}
          />
        )}
      </section>

      <section className="grid">
        <form className="card" onSubmit={agregarCiudad}>
          <h2>Ciudad</h2>
          <label>
            Nombre
            <input value={nombreCiudad} onChange={(e) => setNombreCiudad(e.target.value)} />
          </label>
          <button>Agregar ciudad</button>
          <ul className="lista">
            {ciudades.map((ciudad) => (
              <li key={ciudad.nombre}>
                <span>{ciudad.nombre}</span>
                <button type="button" className="danger" onClick={() => quitarCiudad(ciudad.nombre)}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        </form>

        <form className="card" onSubmit={agregarPersona}>
          <h2>Persona</h2>
          <label>
            Nombre
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </label>
          <label>
            Edad
            <input
              type="number"
              min="1"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              required
            />
          </label>
          <label>
            Ciudad
            <select value={ciudadPersona} onChange={(e) => setCiudadPersona(e.target.value)}>
              {ciudades.map((ciudad) => (
                <option key={ciudad.nombre}>{ciudad.nombre}</option>
              ))}
            </select>
          </label>
          <button>Agregar persona</button>
        </form>

        <section className="card">
          <h2>Quién vive en</h2>
          <select value={ciudadSel} onChange={(e) => setCiudadSel(e.target.value)}>
            {ciudades.map((ciudad) => (
              <option key={ciudad.nombre}>{ciudad.nombre}</option>
            ))}
          </select>
          {vivenAhi.length === 0 ? (
            <p className="muted">Nadie vive aquí.</p>
          ) : (
            <ul className="lista">
              {vivenAhi.map((persona) => (
                <li key={persona.nombre}>
                  <span>
                    {persona.nombre}, {persona.edad}
                  </span>
                  <button type="button" className="danger" onClick={() => quitarPersona(persona.nombre)}>
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  )
}

export default App
