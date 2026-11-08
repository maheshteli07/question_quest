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
