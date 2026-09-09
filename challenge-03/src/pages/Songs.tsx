import { useState } from 'react'
import LinkedList from '../lists/LinkedList'

const songs = new LinkedList()

songs.append('Canción 1')
songs.append('Canción 2')
songs.append('Canción 3')

function Songs() {
  const [currentSong, setCurrentSong] = useState(songs.head)

  const nextSong = () => {
    if (currentSong?.next) {
      setCurrentSong(currentSong.next)
    }
  }

  return (
    <div>
      <h1>Lista de canciones</h1>

      <h2>{currentSong?.value}</h2>

      <button onClick={nextSong}>
        Siguiente
      </button>
    </div>
  )
}

export default Songs