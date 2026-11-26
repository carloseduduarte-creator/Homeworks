# Challenge 13 - Buscador de GIFs

Reto 13 de Estructuras de Datos II: consumo de una API con `fetch`.

## Cómo lo ejecutamos

1. Instalamos las dependencias:

```bash
npm install
```

2. Copiamos `.env.example` como `.env` y pegamos nuestra API key de GIPHY:

```
VITE_GIPHY_API_KEY=nuestra_api_key
```

3. Iniciamos el proyecto:

```bash
npm run dev
```

## Qué usamos

- `useState` para el texto, los GIFs, el estado de carga y los errores.
- `useEffect` para hacer la petición cuando cambia la búsqueda.
- `fetch` con `URLSearchParams` para llamar a la API de GIPHY.
- `AbortController` para cancelar la petición anterior.
