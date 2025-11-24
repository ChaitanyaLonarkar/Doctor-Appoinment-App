# pdf_rag_chat/views.py
import os
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import UploadSerializer, ChatStartSerializer
from .models import Document, ChatSession, Message, Chunk
from .pdf_indexing import index_document, retrieve_top_k
import uuid
import openai  # use OpenAI-compatible client pointed at Groq
from openai import OpenAI
# configure OpenAI client to call Groq
openai_api_key = settings.GROQ_API_KEY
openai_base = os.environ.get("GROQ_BASE_URL", "https://api.groq.com/openai/v1")
if openai_api_key:
    # openai.OpenAI client usage (modern openai lib)
    # If using older openai package: openai.api_key = ...; openai.api_base = ...
    try:
        # new OpenAI client
        client = openai.OpenAI(api_key=openai_api_key, base_url=openai_base)
    except Exception:
        # fallback to classic
        openai.api_key = openai_api_key
        openai.api_base = openai_base
        client = openai

SYSTEM_PROMPT = (
  """
You are an intelligent assistant. You MUST use:
1. The conversation history for follow-up questions.
2. The retrieved PDF context for factual answers.

Rules:
- If the user asks a follow-up question, use earlier messages.
- If the answer is NOT in the document, but is inferable from chat history, answer using chat history.
- If neither helps, say: "I don't know based on the provided document."

Be short, accurate, and contextual.
"""
)

class UploadPDFView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):

        file = request.FILES.get('upload')
        # print("file", file.name)
        # ser = UploadSerializer(data=request.data)
        if not file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
        
        # if not ser.is_valid():
        #     return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

        title = file.name
        doc = Document.objects.create(title=title, upload=file)
        local_path = doc.upload.path
        base_dir = os.path.join(settings.BASE_DIR, "faiss_data")
        try:
            info = index_document(doc, local_path, base_dir)
        except Exception as e:
            doc.delete()
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # optional: persist chunks in DB for quick access / rendering
        # load meta and create Chunk objects
        meta = json_load_safe(doc.meta_store_path)
        for idx, v in meta.items():
            Chunk.objects.create(document=doc, chunk_id=v["chunk_id"], text=v["text"])
        return Response({"doc_id": doc.id, "title": doc.title, "indexed_chunks": info["num_chunks"]}, status=status.HTTP_201_CREATED)

def json_load_safe(path):
    import json, os
    if not os.path.exists(path):
        return {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

class ChatView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):

        ser = ChatStartSerializer(data=request.data)
        if not ser.is_valid():
            return Response(ser.errors, status=400)

        data = ser.validated_data

        session_id = data.get("session_id") or str(uuid.uuid4())
        session, _ = ChatSession.objects.get_or_create(session_id=session_id)

        user_question = data["question"]
        Message.objects.create(session=session, role="user", content=user_question)

        # ---- LOAD DOCUMENT ----
        try:
            doc = Document.objects.get(id=data["doc_id"])
        except Document.DoesNotExist:
            return Response({"error": "document not found"}, status=404)

        # ---- RAG RETRIEVAL ----
        retrieved = retrieve_top_k(doc, user_question, k=4)
        retrieved_text = "\n\n".join([r["text"] for r in retrieved])

        # ---- GET CHAT HISTORY (Not RAG messages) ----
        history_messages = (
            session.messages.filter(role__in=["user", "assistant"])
            .order_by("created_at")
        )

        history = [
            {"role": m.role, "content": m.content}
            for m in history_messages
        ]

        # ---- FINAL MESSAGE CONSTRUCTION ----
        messages = []

        # SYSTEM
        messages.append({"role": "system", "content": SYSTEM_PROMPT})

        # USER + ASSISTANT chat history
        messages.extend(history)

        # RAG context (as SEPARATE SYSTEM message)
        messages.append({
            "role": "system",
            "content": f"Relevant information from the document:\n\n{retrieved_text}"
        })

        # Current question
        messages.append({"role": "user", "content": user_question})

        # ---- CALL GROQ ----
        client = OpenAI(
            api_key=os.environ.get("GROQ_API_KEY"),
            base_url="https://api.groq.com/openai/v1"
        )

        try:
            resp = client.chat.completions.create(
                model=os.environ.get("GROQ_MODEL", "llama-3.1-8b-instant"),
                messages=messages,
                max_tokens=400,
                temperature=0.2
            )
            answer = resp.choices[0].message.content

        except Exception as e:
            return Response({"error": "LLM request failed", "details": str(e)}, status=500)

        # Save answer
        Message.objects.create(session=session, role="assistant", content=answer)

        return Response({
            "session_id": session.session_id,
            "answer": answer,
            "retrieved": retrieved
        })



# class ChatView(APIView):
#     permission_classes = [permissions.AllowAny]
#     def post(self, request):
#         """
#         JSON:
#         {
#           "session_id": "optional-client-generated-or-server",
#           "doc_id": 1,
#           "question": "..."
#         }
#         """
#         ser = ChatStartSerializer(data=request.data)
#         if not ser.is_valid():
#             return Response(ser.errors, status=400)
#         data = ser.validated_data
#         session_id = data.get("session_id") or str(uuid.uuid4())
#         # get or create session
#         session, _ = ChatSession.objects.get_or_create(session_id=session_id)
#         # save user message
#         Message.objects.create(session=session, role="user", content=data["question"])
#         try:
#             doc = Document.objects.get(id=data["doc_id"])
#         except Document.DoesNotExist:
#             return Response({"error": "document not found"}, status=404)

#         # retrieve top-k doc passages
#         retrieved = retrieve_top_k(doc, data["question"], k=4)
#         retrieved_text = "\n\n---\n\n".join([f"[chunk_id: {r['chunk_id']}]\n{r['text']}" for r in retrieved])

#         # fetch last N messages for context
#         RECENT_N = 6
#         recent_msgs_qs = session.messages.all().order_by('-created_at')[:RECENT_N]
#         # reverse to chronological
#         recent_msgs = list(reversed([{"role": m.role, "content": m.content} for m in recent_msgs_qs]))

#         # build prompt/messages
#         messages = []
#         messages.append({"role": "system", "content": SYSTEM_PROMPT})
#         # include recent conversation turn-by-turn
#         for m in recent_msgs:
#             messages.append({"role": m["role"], "content": m["content"]})

#         # add retrieved context as a separate user/system message so model uses it as source
#         context_message = (
#             "Context (retrieved from document):\n\n"
#             f"{retrieved_text}\n\n"
#             "Answer the user's question using this context; if not present, say you don't know."
#         )
#         messages.append({"role": "system", "content": context_message})

#         # finally the user's current question (again) to focus the model
#         messages.append({"role": "user", "content": data["question"]})

#         # Call Groq via OpenAI-compatible Responses API
#         try:
#             # Using new OpenAI client style if available
#             if hasattr(client, "responses") and hasattr(client.responses, "create"):
#                 resp = client.responses.create(
#                     model=os.environ.get("GROQ_MODEL", "openai/gpt-oss-20b"),
#                     messages=messages,
#                     max_tokens=512,
#                     temperature=0.0
#                 )
#                 # response parsing: prefer output_text, else choices structure
#                 answer = getattr(resp, "output_text", None)
#                 if not answer:
#                     # try dict-style extraction
#                     if isinstance(resp, dict):
#                         answer = resp.get("output_text") or (resp.get("choices") or [{}])[0].get("message", {}).get("content")
#                     else:
#                         # fallback to string
#                         answer = str(resp)
#             else:
#                 # fallback to openai (older) client
#                 resp = openai.ChatCompletion.create(
#                     model=os.environ.get("GROQ_MODEL", "openai/gpt-oss-20b"),
#                     messages=messages,
#                     max_tokens=512,
#                     temperature=0.0
#                 )
#                 answer = resp["choices"][0]["message"]["content"]
#         except Exception as e:
#             return Response({"error": "LLM request failed", "details": str(e)}, status=500)

#         # save assistant message
#         Message.objects.create(session=session, role="assistant", content=answer)

#         return Response({
#             "session_id": session.session_id,
#             "answer": answer,
#             "retrieved": retrieved
#         })
