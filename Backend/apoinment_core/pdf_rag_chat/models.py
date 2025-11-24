# pdf_rag_chat/models.py
from django.db import models

class Document(models.Model):
    title = models.CharField(max_length=255,blank=True,default="")
    upload = models.FileField(upload_to="uploads/")
    created_at = models.DateTimeField(auto_now_add=True)
    faiss_index_path = models.CharField(max_length=1024, blank=True, default='')
    meta_store_path = models.CharField(max_length=1024, blank=True, default='')

    def __str__(self):
        return self.upload

class Chunk(models.Model):
    document = models.ForeignKey(Document, related_name='chunks', on_delete=models.CASCADE)
    chunk_id = models.CharField(max_length=255)
    text = models.TextField()

    def __str__(self):
        return f"{self.document.title} - {self.chunk_id}"

class ChatSession(models.Model):
    """
    A conversation session. A client can create one session and reuse session_id
    to keep context across turns.
    """
    session_id = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.session_id

class Message(models.Model):
    """
    Stores messages in the session. role in {'user','assistant','system'}.
    """
    session = models.ForeignKey(ChatSession, related_name='messages', on_delete=models.CASCADE)
    role = models.CharField(max_length=32)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.session.session_id}"