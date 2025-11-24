# pdf_rag_chat/utils/pdf_indexing.py
import os, json
from PyPDF2 import PdfReader
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss

EMBED_MODEL_NAME = "all-MiniLM-L6-v2"
EMBED_MODEL = SentenceTransformer(EMBED_MODEL_NAME)
EMBED_DIM = EMBED_MODEL.get_sentence_embedding_dimension()

def extract_text_from_pdf(path):
    reader = PdfReader(path)
    texts = []
    for page in reader.pages:
        t = page.extract_text()
        if t:
            texts.append(t)
    return "\n".join(texts)

def chunk_text(text, chunk_size=1000, overlap=200):
    chunks = []
    start = 0
    L = len(text)
    while start < L:
        end = min(start + chunk_size, L)
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        start += chunk_size - overlap
    return chunks

def embed_texts(texts):
    return EMBED_MODEL.encode(texts, convert_to_numpy=True, show_progress_bar=False)

def create_faiss_index(embeddings):
    d = embeddings.shape[1]
    index = faiss.IndexFlatL2(d)
    index.add(embeddings)
    return index

def save_faiss_index(index, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    faiss.write_index(index, path)

def load_faiss_index(path):
    if not os.path.exists(path):
        return None
    return faiss.read_index(path)

def save_meta_map(meta_map, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(meta_map, f, ensure_ascii=False, indent=2)

def load_meta_map(path):
    if not os.path.exists(path):
        return {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def index_document(document_obj, file_path, base_dir):
    text = extract_text_from_pdf(file_path)
    if not text.strip():
        raise ValueError("PDF contains no readable text.")
    chunks = chunk_text(text, chunk_size=1000, overlap=200)
    embeddings = embed_texts(chunks)  # numpy (n, d)

    os.makedirs(base_dir, exist_ok=True)
    idx_path = os.path.join(base_dir, f"{document_obj.id}.index")
    meta_path = os.path.join(base_dir, f"{document_obj.id}_meta.json")

    index = create_faiss_index(embeddings)
    save_faiss_index(index, idx_path)

    meta_map = {}
    for i, chunk in enumerate(chunks):
        meta_map[str(i)] = {"text": chunk, "chunk_id": f"{document_obj.id}_{i}"}

    save_meta_map(meta_map, meta_path)

    document_obj.faiss_index_path = idx_path
    document_obj.meta_store_path = meta_path
    document_obj.save()

    return {"num_chunks": len(chunks), "index_path": idx_path, "meta_path": meta_path}

def retrieve_top_k(document_obj, query, k=4):
    idx = load_faiss_index(document_obj.faiss_index_path)
    if idx is None:
        return []
    q_emb = EMBED_MODEL.encode([query], convert_to_numpy=True)
    D, I = idx.search(q_emb, k)
    meta_map = load_meta_map(document_obj.meta_store_path)
    results = []
    for dist, idx_i in zip(D[0].tolist(), I[0].tolist()):
        if idx_i == -1:
            continue
        mp = meta_map.get(str(idx_i))
        if mp:
            results.append({"text": mp["text"], "score": float(dist), "chunk_id": mp["chunk_id"]})
    return results
