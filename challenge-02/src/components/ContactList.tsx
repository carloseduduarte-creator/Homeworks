function ContactList({ contacts, deleteContact }: any) {

  return (
    <>
      <h2>Lista de contactos</h2>

      <ul>
        {contacts.map((contact: any) => (
          <li key={contact.id}>

            {contact.name} - {contact.phone}

            <button onClick={() => deleteContact(contact.id)}>
              Eliminar
            </button>

          </li>
        ))}
      </ul>
    </>
  )
}

export default ContactList