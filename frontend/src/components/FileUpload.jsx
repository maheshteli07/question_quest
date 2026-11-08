function FileUpload({ onUpload, isUploading }) {
  function submitUpload(event) {
    event.preventDefault()
    const file = event.currentTarget.elements.namedItem('pdf-file').files[0]
    if (file) onUpload(file)
  }

  return (
    <form className="file-upload" onSubmit={submitUpload}>
      <label htmlFor="pdf-file">Choose a PDF file</label>
      <div className="search-input">
        <input
          id="pdf-file"
          name="pdf-file"
          type="file"
          accept="application/pdf,.pdf"
          required
          disabled={isUploading}
        />
        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Uploading…' : 'Upload PDF'}
        </button>
      </div>
    </form>
  )
}

export default FileUpload
