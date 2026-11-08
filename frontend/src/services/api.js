const sampleQuestions = [
  {
    id: '1',
    category: 'Python',
    title: 'How do I read a CSV file in Python?',
    body: 'Learn how to load tabular data and work with rows using the standard library.',
    url: 'https://docs.python.org/3/library/csv.html',
  },
  {
    id: '2',
    category: 'JavaScript',
    title: 'What is the difference between let and const?',
    body: 'Understand block scope and reassignment in modern JavaScript.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const',
  },
]

export async function searchQuestions(query, model = 'hybrid') {
  const apiUrl = import.meta.env.VITE_API_URL
  if (apiUrl) {
    const response = await fetch(
      `${apiUrl}/search?q=${encodeURIComponent(query)}&model=${model}`,
    )
    if (!response.ok) throw new Error('Unable to search questions')
    return response.json()
  }

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  return sampleQuestions.filter((question) =>
    terms.some((term) => `${question.title} ${question.body}`.toLowerCase().includes(term)),
  )
}

export async function uploadDocument(file) {
  const apiUrl = import.meta.env.VITE_API_URL
  if (!apiUrl) {
    throw new Error('Set VITE_API_URL to the backend API URL before uploading PDFs.')
  }

  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${apiUrl}/upload`, {
    method: 'POST',
    body: formData,
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error || 'Unable to upload PDF')
  }
  return result
}

export async function predictQuestions(text) {
  const apiUrl = import.meta.env.VITE_API_URL
  if (!apiUrl) {
    throw new Error('Set VITE_API_URL to the backend API URL to generate predictions.')
  }

  const response = await fetch(`${apiUrl}/predictions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error || 'Unable to generate predictions')
  }
  return result
}
