# Question Quest

Question Quest is a searchable question discovery app with a Vite/React
frontend and a Flask backend. The backend exposes lexical, BM25, semantic,
and hybrid search model entry points.

## Run the frontend

```powershell
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` to `http://localhost:5000/api` when connecting the frontend
to Flask. Without it, search uses built-in sample results and PDF upload is
disabled.
Open `/upload` to upload a PDF and preview its extracted text. The backend
accepts PDF files up to 10 MB.
Use `/predictions` to find related questions from pasted text or an uploaded
PDF. Predictions are ranked against the questions in `backend/data/questions.csv`.

## Run the backend

```powershell
cd backend
python -m pip install -r requirements.txt
python main.py
```

The search endpoint is available at
`http://localhost:5000/api/search?q=python&model=hybrid`.
PDF uploads are handled at `http://localhost:5000/api/upload`.
Question predictions are available at `http://localhost:5000/api/predictions`
using a JSON request body such as `{"text":"How do I read a CSV file in Python?"}`.
