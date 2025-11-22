import os
from django.conf import settings
import groq
from rest_framework.views import APIView
from rest_framework.response import Response

from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings


GROQ_API_KEY = settings.GROQ_API_KEY

client = groq.Client(api_key=GROQ_API_KEY)


class ChatbotAsk(APIView):
    def post(self, request):
        query = request.data.get("query")

        if not query:
            return Response({"error": "Query is required"}, status=400)

        # Load FAISS Vector DB
        db = FAISS.load_local(
            "hospital_vectordb",
            HuggingFaceEmbeddings(),
            allow_dangerous_deserialization=True
        )

        # Retrieve relevant context
        docs = db.similarity_search(query, k=4)
        context = "\n".join([d.page_content for d in docs])

        prompt = f"""
You are a hospital assistant chatbot. 
Answer ONLY from the context below. 
If context does not contain answer, reply: "Sorry, I don’t have information about that."

Context:
{context}

User Question:
{query}

Answer:
"""

        # Groq LLM Call
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": "You are a helpful hospital information assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
        )

        answer = response.choices[0].message.content

        return Response({"answer": answer})
