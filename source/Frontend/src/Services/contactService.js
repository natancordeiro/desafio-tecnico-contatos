const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const BASE_URL = `${API_URL}/contacts`

async function handleResponse(response) {
  if (response.ok) {
    if (response.status === 204) return null
    return await response.json()
  }

  let message = 'Ocorreu um erro na requisição.'

  try {
    const errorData = await response.json()
    message = errorData.message || errorData.title || message
  } catch {
    // sem ação necessária
  }

  throw new Error(message)
}

export async function getContacts() {
  const response = await fetch(BASE_URL)
  return handleResponse(response)
}

export async function createContact(payload) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  return handleResponse(response)
}

export async function updateContact(id, payload) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  return handleResponse(response)
}

export async function deleteContact(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })

  return handleResponse(response)
}