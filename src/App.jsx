import { useEffect, useState } from 'react';
import './App.css';

// La API key está en el archivo .env
const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

function App() {
  const [text, setText] = useState('');     // lo que escribe el usuario
  const [search, setSearch] = useState('');  // lo que se va a buscar
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Se ejecuta cada vez que cambia "search"
  useEffect(() => {
    if (search === '' || !API_KEY) {
      return;
    }

    // Si el usuario busca otra cosa antes de que termine esta petición, la cancelamos
    const controller = new AbortController();

    async function getGifs() {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams({
          api_key: API_KEY,
          q: search,
          limit: 25,
          offset: 0,
          rating: 'g',
          lang: 'es',
        });

        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?${params}`,
          { signal: controller.signal }
        );

        // fetch no da error con un 404 o 500, por eso revisamos res.ok
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        setGifs(data.data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('No se pudieron cargar los GIFs. Intenta otra vez.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getGifs();

    // Limpieza: cancela la petición si cambia la búsqueda o se cierra la página
    return () => controller.abort();
  }, [search]);

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim() === '') {
      return;
    }
    setSearch(text.trim());
  }

  return (
    <div className="app">
      <h1>Buscador de GIFs</h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe algo, por ejemplo: gato"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {!API_KEY && <p className="error">Falta la API key. Revisa el archivo .env</p>}
      {error && <p className="error">{error}</p>}

      {!loading && search !== '' && gifs.length === 0 && !error && (
        <p>No encontré GIFs para "{search}".</p>
      )}

      <div className="grid">
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
