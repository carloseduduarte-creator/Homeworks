import { useState } from 'react'

function ContactForm({ addContact }: any) {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const add = () => {

    if (name === '' || phone === '') {
      return
    }

    addContact(name, phone)

    setName('')
    setPhone('')
  }

  return (
    <>
      <input
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Teléfono"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />

      <button onClick={add}>
        Agregar
      </button>
    </>
  )
}

export default ContactForm
