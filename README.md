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

Set `VITE_API_URL` to the backend URL when connecting the frontend to Flask.
Without it, the frontend uses its built-in sample results.

## Run the backend

```powershell
cd backend
python -m pip install -r requirements.txt
python main.py
```

The search endpoint is available at
`http://localhost:5000/api/search?q=python&model=hybrid`.
