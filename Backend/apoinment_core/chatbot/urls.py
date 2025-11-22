
from django.urls import path
# from .views import UploadHospitalPDF
from .chatbot_views import *


urlpatterns = [
    # path('uploadpdf/', UploadHospitalPDF.as_view(), name='upload-hospital-pdf'),
    # path('chat/', ChatbotAsk.as_view(), name='chat-with-hospital-docs'),
] 