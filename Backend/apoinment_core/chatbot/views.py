from django.shortcuts import render

# Create your views here.
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
# from langchain_community.embeddings import SentenceTransformer
from sentence_transformers import SentenceTransformer
from PyPDF2 import PdfReader

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

import os
from django.conf import settings
from accounts.models import Userr
from .models import HospitalPDF


# import os
# from django.conf import settings
import groq
# from rest_framework.views import APIView
# from rest_framework.response import Response

from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings


GROQ_API_KEY = settings.GROQ_API_KEY

client = groq.Client(api_key=GROQ_API_KEY)

def create_vector_store_from_pdf(pdf_path):
    # Read PDF
    reader = PdfReader(pdf_path)
    text = ""

    for page in reader.pages:
        text += page.extract_text() + "\n"

    if not text.strip():
        raise ValueError("PDF contains no readable text")

    # Split text into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    chunks = splitter.split_text(text)

    # Generate embeddings
    embeddings = SentenceTransformer(model_name="all-MiniLM-L6-v2")

    # Create FAISS vector DB
    db = FAISS.from_texts(chunks, embeddings)

    # Save DB locally
    db.save_local("hospital_vectordb")

    return "Vector DB created successfully from PDF!"


class UploadHospitalPDF(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        pdf_file = request.FILES.get("pdf")
        doctor_id = 13
        doctor=Userr.objects.get(id=doctor_id)

        print("Doctor uploading PDF:", doctor.username)
        if not pdf_file:
            return Response({"error": "PDF file required"}, status=400)

        # Save PDF in model
        pdf_instance = HospitalPDF.objects.create(doctor=doctor,pdf=pdf_file, )
        pdf_instance.save()

        # Get actual file path
        pdf_path = os.path.join(settings.MEDIA_ROOT, str(pdf_instance.pdf))

        # Create vector store from saved PDF
        create_vector_store_from_pdf(pdf_path)

        return Response({
            "message": "PDF uploaded & Vector DB created!",
            "pdf_path": str(pdf_instance.pdf)
        })

    def get(self, request):
        return Response({"message": "Upload Hospital PDF"})


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


# class UploadHospitalPDF(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request):
#         pdf_file = request.FILES.get("pdf")

#         if not pdf_file:
#             return Response({"error": "PDF file required"}, status=400)

#         # Save temporarily
#         pdf_path = f"uploads/{pdf_file.name}"

#         with open(pdf_path, "wb+") as destination:
#             for chunk in pdf_file.chunks():
#                 destination.write(chunk)

#         # Create vector store
#         create_vector_store_from_pdf(pdf_path)

#         return Response({"message": "PDF uploaded & Vector DB created!"})

#     def get(self, request):
#         return Response({"message": "Upload Hospital PDF"})