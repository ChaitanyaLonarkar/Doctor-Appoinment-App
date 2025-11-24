# # pdf_rag/models.py
# from django.db import models

# class Document(models.Model):
#     title = models.CharField(max_length=255)
#     upload = models.FileField(upload_to="uploads/")
#     created_at = models.DateTimeField(auto_now_add=True)
#     # path to faiss index and metadata map file (on disk)
#     faiss_index_path = models.CharField(max_length=1024, blank=True, default='')
#     meta_store_path = models.CharField(max_length=1024, blank=True, default='')

#     def __str__(self):
#         return self.title

# class Chunk(models.Model):
#     document = models.ForeignKey(Document, related_name='chunks', on_delete=models.CASCADE)
#     chunk_id = models.CharField(max_length=255, unique=True)
#     text = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.document.title} - {self.chunk_id}"
