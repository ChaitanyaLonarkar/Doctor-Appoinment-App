# pdf_rag_chat/serializers.py
from rest_framework import serializers
from .models import Document, ChatSession, Message

class UploadSerializer(serializers.Serializer):
    title = serializers.CharField()
    file = serializers.FileField()

    # def save(self, **kwargs):
    #     # create a pdf  title here



class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'title', 'upload', 'created_at']

class ChatStartSerializer(serializers.Serializer):
    session_id = serializers.CharField(required=False)  # optional: create if missing
    doc_id = serializers.IntegerField()
    question = serializers.CharField()

class ChatResponseSerializer(serializers.Serializer):
    answer = serializers.CharField()
    retrieved = serializers.ListField()
