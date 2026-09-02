interface Contact {
  id: number
  name: string
  phone: string
}

interface ContactItemProps {
  contact: Contact
  onDeleteContact: (id: number) => void
}

function ContactItem({
  contact,
  onDeleteContact,
}: ContactItemProps) {
  return (
    <li>
      <strong>{contact.name}</strong>
      <span> - {contact.phone}</span>

      <button
        type="button"
        onClick={() => onDeleteContact(contact.id)}
      >
        Eliminar
      </button>
    </li>
  )
}

export default ContactItem