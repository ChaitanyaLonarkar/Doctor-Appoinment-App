
from django.urls import path

from .views import Login, RegisterDoctor, RegisterPatient



urlpatterns = [
    path('register/doctor/' ,RegisterDoctor.as_view(), name='register_doctor'),
    path('register/patient/', RegisterPatient.as_view(), name='register_patient'),
    path('login/', Login.as_view(), name='login'),
    
] 