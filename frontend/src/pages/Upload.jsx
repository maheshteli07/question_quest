import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import { uploadDocument } from '../services/api'

function Upload() {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [document, setDocument] = useState(null)

  async function handleUpload(file) {
    setIsUploading(true)
    setError('')
    setDocument(null)
    try {
      setDocument(await uploadDocument(file))
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <section className="page narrow-page">
      <p className="eyebrow">Add a document</p>
      <h1>Upload a PDF</h1>
      <p className="lead">
        Upload a PDF to extract its text for review.
      </p>
      <FileUpload onUpload={handleUpload} isUploading={isUploading} />
      {error && <p className="upload-error" role="alert">{error}</p>}
      {document && (
        <section className="upload-result" aria-live="polite">
          <h2>{document.filename}</h2>
          <p>{document.page_count} pages · {document.character_count} characters extracted</p>
          <button
            type="button"
            disabled={!document.text.trim()}
            onClick={() => {
              window.sessionStorage.setItem('prediction-text', document.text)
              window.location.href = '/predictions'
            }}
          >
            Predict questions from this PDF
          </button>
          <pre>{document.text || 'No selectable text was found in this PDF.'}</pre>
        </section>
      )}
    </section>
  )
}

export default Upload
