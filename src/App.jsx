import { useMemo, useState } from 'react'
import Trie from './Trie'
import MaxHeap from './MaxHeap'
import Graph from './Graph'

const iniciales = [
  { name: 'tití me preguntó', popularity: 99 },
  { name: 'me porto bonito', popularity: 96 },
  { name: 'dakiti', popularity: 94 },
  { name: 'ojitos lindos', popularity: 91 },
  { name: 'yonaguni', popularity: 88 },
  { name: 'yo perreo sola', popularity: 85 },
  { name: 'callaita', popularity: 83 },
  { name: 'moscow mule', popularity: 80 },
]

const relacionesIniciales = [
  ['tití me preguntó', 'moscow mule'],
  ['me porto bonito', 'ojitos lindos'],
  ['dakiti', 'callaita'],
  ['yonaguni', 'yo perreo sola'],
]

function armarTrie(canciones) {
  const trie = new Trie()
  canciones.forEach((cancion) => trie.insert(cancion.name, cancion.popularity))
  return trie
}

function armarGrafo(canciones, relaciones) {
  const grafo = new Graph()
  canciones.forEach((cancion) => grafo.addNode(cancion.name))
  relaciones.forEach(([a, b]) => grafo.addEdge(a, b))
  return grafo
}

function armarRanking(canciones) {
  const heap = new MaxHeap(canciones)
  const top = []
  while (heap.size() > 0 && top.length < 5) top.push(heap.pop())
  return top
}

function App() {
  const [canciones, setCanciones] = useState(iniciales)
  const [relaciones, setRelaciones] = useState(relacionesIniciales)
  const [nombre, setNombre] = useState('')
  const [popularidad, setPopularidad] = useState('')
  const [busqueda, setBusqueda] = useState('m')
  const [existe, setExiste] = useState(null)
  const [sugerencias, setSugerencias] = useState(() =>
    armarTrie(iniciales).palabrasConPrefijo('m')
  )
  const [origen, setOrigen] = useState(iniciales[0].name)
  const [destino, setDestino] = useState(iniciales[1].name)
  const [seleccion, setSeleccion] = useState(iniciales[0].name)

  const trie = useMemo(() => armarTrie(canciones), [canciones])
  const grafo = useMemo(() => armarGrafo(canciones, relaciones), [canciones, relaciones])
  const ranking = useMemo(() => armarRanking(canciones), [canciones])
  const parecidas = grafo.adjList[seleccion] || []

  const agregar = (e) => {
    e.preventDefault()
    const name = nombre.trim().toLowerCase()
    const popularity = Number(popularidad)
    if (!name || Number.isNaN(popularity) || popularity < 0) return alert('Tiene que ser cero o más')
    if (trie.search(name)) return alert('Ya la tengo')

    setCanciones([...canciones, { name, popularity }])
    setOrigen(name)
    setSeleccion(name)
    setNombre('')
    setPopularidad('')
  }

  const buscar = (e) => {
    e.preventDefault()
    const texto = busqueda.trim().toLowerCase()
    setExiste(trie.search(texto))
    setSugerencias(trie.palabrasConPrefijo(texto))
  }

  const relacionar = (e) => {
    e.preventDefault()
    if (!origen || !destino || origen === destino) return
    if (grafo.adjList[origen]?.includes(destino)) return

    setRelaciones([...relaciones, [origen, destino]])
    setSeleccion(origen)
  }

  return (
    <main>
      <h1>Parcial 3</h1>

      <section className="grid">
        <form className="card" onSubmit={agregar}>
          <h2>Agrego una canción</h2>
          <label>
            Título
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </label>
          <label>
            Reproducciones
            <input
              type="number"
              min="0"
              value={popularidad}
              onChange={(e) => setPopularidad(e.target.value)}
              required
            />
          </label>
          <button>Agregar</button>
        </form>

        <form className="card" onSubmit={buscar}>
          <h2>Busco una canción</h2>
          <label>
            Título o inicio
            <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          </label>
          <button>Buscar</button>
          {existe === true && <p className="muted">Sí la tengo</p>}
          {existe === false && <p className="muted">No la tengo</p>}
          {sugerencias.length === 0 ? (
            <p className="muted">No se me ocurre ninguna</p>
          ) : (
            <ul className="lista">
              {sugerencias.map((cancion) => (
                <li key={cancion.name}>
                  <span>{cancion.name}</span>
                  <span className="muted">{cancion.popularity}</span>
                </li>
              ))}
            </ul>
          )}
        </form>
      </section>

      <section className="grid">
        <section className="card">
          <h2>Mis canciones</h2>
          <ul className="lista">
            {canciones.map((cancion) => (
              <li key={cancion.name}>
                <span>{cancion.name}</span>
                <span className="muted">{cancion.popularity}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Mi top 5</h2>
          <ol className="lista">
            {ranking.map((cancion, i) => (
              <li key={cancion.name}>
                <span>
                  {i + 1}. {cancion.name}
                </span>
                <span className="muted">{cancion.popularity}</span>
              </li>
            ))}
          </ol>
        </section>
      </section>

      <section className="grid">
        <form className="card" onSubmit={relacionar}>
          <h2>Relaciono canciones</h2>
          <label>
            Canción
            <select value={origen} onChange={(e) => setOrigen(e.target.value)}>
              {canciones.map((cancion) => (
                <option key={cancion.name}>{cancion.name}</option>
              ))}
            </select>
          </label>
          <label>
            Parecida
            <select value={destino} onChange={(e) => setDestino(e.target.value)}>
              {canciones.map((cancion) => (
                <option key={cancion.name}>{cancion.name}</option>
              ))}
            </select>
          </label>
          <button>Relacionar</button>
        </form>

        <section className="card">
          <h2>Parecidas a</h2>
          <select value={seleccion} onChange={(e) => setSeleccion(e.target.value)}>
            {canciones.map((cancion) => (
              <option key={cancion.name}>{cancion.name}</option>
            ))}
          </select>
          {parecidas.length === 0 ? (
            <p className="muted">Todavía no relaciono ninguna</p>
          ) : (
            <ul className="lista">
              {parecidas.map((nombreCancion) => (
                <li key={nombreCancion}>
                  <span>{nombreCancion}</span>
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
