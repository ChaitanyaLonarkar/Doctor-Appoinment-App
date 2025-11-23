# pdf_rag/utils/pdf_indexing.py
import os
import uuid
import json
import numpy as np
from PyPDF2 import PdfReader
from sentence_transformers import SentenceTransformer
import faiss

MODEL_NAME = "all-MiniLM-L6-v2"  # small, fast embedding model
EMBED_DIM = 384  # for all-MiniLM-L6-v2

EMBED_MODEL = SentenceTransformer(MODEL_NAME)

def extract_text_from_pdf(path):
    reader = PdfReader(path)
    texts = []
    for p in reader.pages:
        text = p.extract_text()
        if text:
            texts.append(text)
    return "\n".join(texts)

def chunk_text(text, chunk_size=1000, overlap=200):
    # Simple char-based chunking
    chunks = []
    start = 0
    length = len(text)
    while start < length:
        end = min(start + chunk_size, length)
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        start += chunk_size - overlap
    return chunks

def embed_texts(texts):
    # returns numpy array shape (n, d)
    embeddings = EMBED_MODEL.encode(texts, convert_to_numpy=True, show_progress_bar=False)
    return embeddings

def create_faiss_index(embeddings, index_path):
    d = embeddings.shape[1]
    index = faiss.IndexFlatL2(d)
    index.add(embeddings)
    faiss.write_index(index, index_path)
    return index

def load_faiss_index(index_path):
    if not os.path.exists(index_path):
        return None
    return faiss.read_index(index_path)

def save_meta_map(meta_map, meta_path):
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(meta_map, f, ensure_ascii=False, indent=2)

def load_meta_map(meta_path):
    if not os.path.exists(meta_path):
        return {}
    with open(meta_path, "r", encoding="utf-8") as f:
        return json.load(f)

def index_document(document_obj, file_path, base_dir):
    """
    - extract text
    - chunk
    - embed
    - create faiss index file at base_dir/{doc_id}.index
    - create meta map base_dir/{doc_id}_meta.json mapping index id -> chunk text
    """
    text = extract_text_from_pdf(file_path)
    if not text.strip():
        raise ValueError("PDF contains no readable text")

    chunks = chunk_text(text, chunk_size=1000, overlap=200)
    if not chunks:
        raise ValueError("No chunks generated from pdf")

    embeddings = embed_texts(chunks)  # (n, d)
    # ensure output dir exists
    os.makedirs(base_dir, exist_ok=True)
    idx_path = os.path.join(base_dir, f"{document_obj.id}.index")
    meta_path = os.path.join(base_dir, f"{document_obj.id}_meta.json")

    # write faiss index
    index = create_faiss_index(embeddings, idx_path)

    # build meta map: mapping numeric id -> metadata (chunk text)
    meta_map = {}
    for i, chunk in enumerate(chunks):
        meta_map[str(i)] = {
            "text": chunk,
            "chunk_id": f"{document_obj.id}_{i}"
        }

    save_meta_map(meta_map, meta_path)

    # update document paths
    document_obj.faiss_index_path = idx_path
    document_obj.meta_store_path = meta_path
    document_obj.save()

    return {
        "index_path": idx_path,
        "meta_path": meta_path,
        "num_chunks": len(chunks)
    }

def retrieve_top_k(document_obj, query, k=4):
    """
    - embed query
    - load faiss index and meta map
    - return list of (text, score)
    """
    idx = load_faiss_index(document_obj.faiss_index_path)
    if idx is None:
        return []

    q_emb = EMBED_MODEL.encode([query], convert_to_numpy=True)
    D, I = idx.search(q_emb, k)  # distances, indices
    meta_map = load_meta_map(document_obj.meta_store_path)
    results = []
    for dist, idx_i in zip(D[0].tolist(), I[0].tolist()):
        if idx_i == -1:
            continue
        mp = meta_map.get(str(idx_i))
        if mp:
            results.append({"text": mp["text"], "score": float(dist)})
    return results
