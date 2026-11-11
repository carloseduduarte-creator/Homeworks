import { useMemo, useState } from 'react'
import Trie from './Trie'
import MinHeap from './MinHeap'

const iniciales = [
  { name: 'air max', popularity: 90 },
  { name: 'air force', popularity: 95 },
  { name: 'air jordan', popularity: 85 },
  { name: 'adidas boost', popularity: 80 },
]

function armarTrie(productos) {
  const trie = new Trie()
  productos.forEach((producto) => trie.insert(producto.name, producto.popularity))
  return trie
}

function searchTopK(trie, prefix, k) {
  const encontrados = trie.palabrasConPrefijo(prefix)
  const heap = new MinHeap()

  encontrados.forEach((producto) => {
    if (heap.size() < k) {
      heap.push(producto)
    } else if (producto.popularity > heap.peek().popularity) {
      heap.pop()
      heap.push(producto)
    }
  })

  const top = []
  while (heap.size() > 0) top.push(heap.pop())
  return top.reverse()
}

function App() {
  const [productos, setProductos] = useState(iniciales)
  const [nombre, setNombre] = useState('')
  const [popularidad, setPopularidad] = useState('')
  const [prefijo, setPrefijo] = useState('air')
  const [k, setK] = useState(2)
  const [resultados, setResultados] = useState(() => searchTopK(armarTrie(iniciales), 'air', 2))

  const trie = useMemo(() => armarTrie(productos), [productos])

  const agregar = (e) => {
    e.preventDefault()
    const name = nombre.trim().toLowerCase()
    const popularity = Number(popularidad)
    if (!name || Number.isNaN(popularity)) return
    if (trie.search(name)) return alert('Ese producto ya está')

    const nuevos = [...productos, { name, popularity }]
    setProductos(nuevos)
    setResultados(searchTopK(armarTrie(nuevos), prefijo.trim().toLowerCase(), Number(k)))
    setNombre('')
    setPopularidad('')
  }

  const buscar = (e) => {
    e.preventDefault()
    const cantidad = Number(k)
    if (!cantidad || cantidad < 1) return alert('El top tiene que ser al menos 1')
    setResultados(searchTopK(trie, prefijo.trim().toLowerCase(), cantidad))
  }

  return (
    <main>
      <header className="card">
        <h1>Challenge 12</h1>
        <p className="muted">
          Los productos se guardan en un trie. El heap devuelve los más populares del prefijo.
        </p>
      </header>

      <section className="grid">
        <form className="card" onSubmit={agregar}>
          <h2>Producto</h2>
          <label>
            Nombre
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="air max" />
          </label>
          <label>
            Popularidad
            <input
              type="number"
              min="0"
              value={popularidad}
              onChange={(e) => setPopularidad(e.target.value)}
              required
            />
          </label>
          <button>Agregar</button>
          <ul className="lista">
            {productos.map((producto) => (
              <li key={producto.name}>
                <span>{producto.name}</span>
                <span className="muted">{producto.popularity}</span>
              </li>
            ))}
          </ul>
        </form>

        <form className="card" onSubmit={buscar}>
          <h2>Buscar</h2>
          <label>
            Prefijo
            <input value={prefijo} onChange={(e) => setPrefijo(e.target.value)} />
          </label>
          <label>
            Top
            <input type="number" min="1" value={k} onChange={(e) => setK(e.target.value)} />
          </label>
          <button>Buscar</button>

          {resultados.length === 0 ? (
            <p className="muted">No hay productos con ese prefijo.</p>
          ) : (
            <ol className="lista">
              {resultados.map((producto, i) => (
                <li key={producto.name}>
                  <span>
                    {i + 1}. {producto.name}
                  </span>
                  <span className="muted">{producto.popularity}</span>
                </li>
              ))}
            </ol>
          )}
        </form>
      </section>
    </main>
  )
}

export default App
