import { useEffect, useState } from 'react'

const emptyForm = {
  name: '',
  email: '',
  phone: ''
}

export default function ContactForm({
  selectedContact,
  onSubmit,
  onCancel,
  isSubmitting
}) {
  const [formData, setFormData] = useState(emptyForm)

  useEffect(() => {
    if (selectedContact) {
      setFormData({
        name: selectedContact.name || '',
        email: selectedContact.email || '',
        phone: selectedContact.phone || ''
      })
      return
    }

    setFormData(emptyForm)
  }, [selectedContact])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim()
    })
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>{selectedContact ? 'Editar contato' : 'Novo contato'}</h2>
        <p>
          {selectedContact
            ? 'Atualize os dados do contato selecionado.'
            : 'Preencha os campos para cadastrar um novo contato.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ex.: João Silva"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Ex.: joao@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={150}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefone</label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Ex.: (11) 99999-9999"
            value={formData.phone}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={20}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Salvando...'
              : selectedContact
              ? 'Atualizar'
              : 'Cadastrar'}
          </button>

          {selectedContact && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar edição
            </button>
          )}
        </div>
      </form>
    </section>
  )
}