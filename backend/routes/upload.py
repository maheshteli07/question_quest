from pathlib import Path
from uuid import uuid4

from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename

from services.pdf_extractor import PDFExtractionError, extract_text

upload_blueprint = Blueprint("upload", __name__)
UPLOAD_FOLDER = Path(__file__).parents[1] / "uploads"


@upload_blueprint.post("/upload")
def upload_pdf():
    uploaded_file = request.files.get("file")
    if uploaded_file is None or not uploaded_file.filename:
        return jsonify({"error": "Choose a PDF file to upload."}), 400

    filename = secure_filename(uploaded_file.filename)
    if not filename.lower().endswith(".pdf"):
        return jsonify({"error": "Only PDF files are supported."}), 400

    data = uploaded_file.read()
    if not data.startswith(b"%PDF-"):
        return jsonify({"error": "The uploaded file is not a valid PDF."}), 400

    try:
        text, page_count = extract_text(data)
    except PDFExtractionError as error:
        return jsonify({"error": str(error)}), 400

    UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)
    stored_filename = f"{uuid4().hex}_{filename}"
    (UPLOAD_FOLDER / stored_filename).write_bytes(data)

    return jsonify(
        {
            "filename": filename,
            "page_count": page_count,
            "character_count": len(text),
            "text": text,
        }
    )
