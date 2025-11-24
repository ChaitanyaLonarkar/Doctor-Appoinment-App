
from django.urls import path
from .views import *


urlpatterns = [
    # path('admin/', "hello"),
    path('adminpanel/', AdminAppointmentListView.as_view(), name='adminpanel'),
   
] 