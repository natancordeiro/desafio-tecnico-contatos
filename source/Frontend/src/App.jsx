import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact
} from './services/contactService'

export default function App() {
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function loadContacts() {
    try {
      setLoading(true)
      setErrorMessage('')
      const data = await getContacts()
      setContacts(data)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  async function handleSubmit(formData) {
    try {
      setIsSubmitting(true)
      setErrorMessage('')
      setSuccessMessage('')

      if (selectedContact) {
        await updateContact(selectedContact.id, formData)
        setSuccessMessage('Contato atualizado com sucesso.')
      } else {
        await createContact(formData)
        setSuccessMessage('Contato cadastrado com sucesso.')
      }

      setSelectedContact(null)
      await loadContacts()
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleEdit(contact) {
    setSuccessMessage('')
    setErrorMessage('')
    setSelectedContact(contact)
  }

  function handleCancelEdit() {
    setSelectedContact(null)
    setSuccessMessage('')
    setErrorMessage('')
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Deseja realmente excluir este contato?')

    if (!confirmed) return

    try {
      setErrorMessage('')
      setSuccessMessage('')
      await deleteContact(id)
      setSelectedContact(null)
      setSuccessMessage('Contato excluído com sucesso.')
      await loadContacts()
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <main className="page">
      <div className="container">
        <header className="hero">
          <span className="badge">Desafio Técnico .NET Core</span>
          <h1>Gerenciador de Contatos</h1>
          <p>
            Aplicação completa com API em ASP.NET Core, Entity Framework Core,
            SQLite, Swagger e interface em React.
          </p>
        </header>

        {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <div className="grid">
          <ContactForm
            selectedContact={selectedContact}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
            isSubmitting={isSubmitting}
          />

          <ContactList
            contacts={contacts}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </main>
  )
}