# pdf_rag/views.py
import os
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import UploadSerializer, DocumentSerializer
from .models import Document, Chunk
from .pdf_indexing import index_document, retrieve_top_k
import tempfile

# Groq / OpenAI compatible client setup (we'll show both options)
import os
# Option A: use openai client pointed at Groq endpoint (recommended for Responses API compatibility)
import openai

GROQ_API_KEY = settings.GROQ_API_KEY
GROQ_BASE_URL = os.environ.get("GROQ_BASE_URL", "https://api.groq.com/openai/v1")  # per Groq docs

openai.api_key = GROQ_API_KEY
openai.api_base = GROQ_BASE_URL

SYSTEM_PROMPT = (
    "You are a helpful assistant that answers questions using the provided document context. "
    "If the answer is not contained in the context, say you don't know and offer to help with alternatives."
)

class UploadPDFView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        ser = UploadSerializer(data=request.data)
        if not ser.is_valid():
            return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
        title = ser.validated_data["title"]
        f = ser.validated_data["file"]
        doc = Document.objects.create(title=title, upload=f)
        # save file to temporary path then index
        local_path = doc.upload.path
        base_dir = os.path.join(settings.BASE_DIR, "faiss_data")
        try:
            info = index_document(doc, local_path, base_dir)
        except Exception as e:
            doc.delete()
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            "doc_id": doc.id,
            "title": doc.title,
            "indexed_chunks": info["num_chunks"]
        }, status=status.HTTP_201_CREATED)

class ChatView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        """
        Expected JSON:
        {
          "doc_id": 1,
          "question": "What is X?"
        }
        """
        doc_id = request.data.get("doc_id")
        question = request.data.get("question")
        if not doc_id or not question:
            return Response({"error": "doc_id and question required"}, status=400)
        try:
            doc = Document.objects.get(id=doc_id)
        except Document.DoesNotExist:
            return Response({"error": "document not found"}, status=404)

        # retrieve top-k relevant chunks
        results = retrieve_top_k(doc, question, k=4)
        context_text = "\n\n---\n\n".join([r["text"] for r in results])

        # build messages for Groq/OpenAI-compatible Responses API
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Context:\n{context_text}\n\nQuestion: {question}"}
        ]

        # call Groq via OpenAI-compatible responses.create (Responses API)
        try:
            response = openai.responses.create(
                model=os.environ.get("GROQ_MODEL", "openai/gpt-oss-20b"),  # change to model you have access to
                messages=messages,
                max_tokens=512,
                temperature=0.0
            )
            # response might contain .output_text or .choices depending on client version; check response content
            answer = getattr(response, "output_text", None)
            if not answer:
                # attempt alternate extraction
                if isinstance(response, dict):
                    answer = response.get("output_text") or response.get("choices", [{}])[0].get("message", {}).get("content")
                else:
                    answer = str(response)
        except Exception as e:
            return Response({"error": "LLM request failed", "details": str(e)}, status=500)

        return Response({
            "answer": answer,
            "retrieved": results
        })
