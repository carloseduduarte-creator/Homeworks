import { useState } from 'react'
import Songs from './pages/Songs'
import Browser from './pages/Browser'

function App() {
  const [page, setPage] = useState('songs')

  return (
    <div>
      <button onClick={() => setPage('songs')}>
        Canciones
      </button>

      <button onClick={() => setPage('browser')}>
        Navegador
      </button>

      {page === 'songs' && <Songs />}

      {page === 'browser' && <Browser />}
    </div>
  )
}

export default App