# Parcial 3

Mini plataforma de canciones. Busco por título, armo el top 5 y relaciono canciones parecidas.

## Cómo lo ejecuto

```bash
npm install
npm run dev
```

Después abro http://localhost:5173.

## Cómo lo hice

Guardé los títulos en un trie. Con eso reviso si la canción existe y saco las sugerencias cuando escribo el inicio del nombre.

El ranking lo armé con un max heap. Saco las canciones de mayor a menor número de reproducciones y dejo solo las primeras cinco.

Las parecidas las conecté con un grafo no dirigido. Si relaciono dos canciones, quedan unidas en las dos.

Los estilos los hice en Sass. Usé variables y un mixin para las tarjetas.
