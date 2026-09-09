import { useState } from 'react'
import DoubleLinkedList from '../lists/DoubleLinkedList'

const pages = new DoubleLinkedList()

pages.append('Google')
pages.append('YouTube')
pages.append('Instagram')

function Browser() {
  const [currentPage, setCurrentPage] = useState(pages.head)

  const nextPage = () => {
    if (currentPage?.next) {
      setCurrentPage(currentPage.next)
    }
  }

  const previousPage = () => {
    if (currentPage?.previous) {
      setCurrentPage(currentPage.previous)
    }
  }

  return (
    <div>
      <h1>Historial del navegador</h1>

      <h2>{currentPage?.value}</h2>

      <button onClick={previousPage}>
        Atrás
      </button>

      <button onClick={nextPage}>
        Adelante
      </button>
    </div>
  )
}

export default Browser