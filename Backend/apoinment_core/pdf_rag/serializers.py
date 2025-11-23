# pdf_rag/serializers.py
from rest_framework import serializers
from .models import Document, Chunk

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'title', 'upload', 'created_at']

class UploadSerializer(serializers.Serializer):
    title = serializers.CharField()
    file = serializers.FileField()
