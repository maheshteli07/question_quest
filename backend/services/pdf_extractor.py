from io import BytesIO

from pypdf import PdfReader
from pypdf.errors import FileNotDecryptedError, PdfReadError


class PDFExtractionError(ValueError):
    """Raised when a PDF cannot be read or contains no extractable text."""


def extract_text(data: bytes) -> tuple[str, int]:
    try:
        reader = PdfReader(BytesIO(data), strict=False)
        if reader.is_encrypted and not reader.decrypt(""):
            raise PDFExtractionError("Encrypted PDFs are not supported.")
        pages = [page.extract_text() or "" for page in reader.pages]
    except (PdfReadError, FileNotDecryptedError) as error:
        raise PDFExtractionError("The uploaded file is not a readable PDF.") from error

    return "\n\n".join(page.strip() for page in pages if page.strip()), len(pages)
