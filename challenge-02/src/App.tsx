import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import './App.css'

interface Contact {
  id: number
  name: string
  phone: string
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setContacts([
        {
          id: 1,
          name: 'Carlos',
          phone: '3001234567'
        },
        {
          id: 2,
          name: 'Maria',
          phone: '3159876543'
        },
        {
          id: 3,
          name: 'Juan',
          phone: '3105555555'
        }
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const addContact = (name: string, phone: string) => {
    const newContact = {
      id: Date.now(),
      name: name,
      phone: phone
    }

    setContacts(old => [...old, newContact])
  }

  const deleteContact = (id: number) => {
    setContacts(old =>
      old.filter(contact => contact.id !== id)
    )
  }

  return (
    <div className="app">
      <h1>Contactos</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <ContactForm addContact={addContact} />

          <ContactList
            contacts={contacts}
            deleteContact={deleteContact}
          />
        </>
      )}
    </div>
  )
}

export default App