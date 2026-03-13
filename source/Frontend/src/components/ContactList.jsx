export default function ContactList({
  contacts,
  loading,
  onEdit,
  onDelete
}) {
  return (
    <section className="card">
      <div className="card-header">
        <h2>Lista de contatos</h2>
        <p>Visualize, edite e exclua os contatos cadastrados.</p>
      </div>

      {loading ? (
        <div className="empty-state">Carregando contatos...</div>
      ) : contacts.length === 0 ? (
        <div className="empty-state">Nenhum contato encontrado.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th className="actions-column">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td className="table-actions">
                    <button
                      className="btn btn-warning"
                      onClick={() => onEdit(contact)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(contact.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}