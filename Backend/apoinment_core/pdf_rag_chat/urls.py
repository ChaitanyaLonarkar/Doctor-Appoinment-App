# pdf_rag_chat/urls.py
from django.urls import path
from .views import UploadPDFView, ChatView

urlpatterns = [
    path("upload_pdf/", UploadPDFView.as_view(), name="upload_pdf"),
    path("chat/", ChatView.as_view(), name="chat"),
]
