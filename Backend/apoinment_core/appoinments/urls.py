
 
from django.urls import path

from .views import *



urlpatterns = [
    # path('admin/', "hello"),

    # slots api
    path('slot/create/', SlotView.as_view(), name='slot-create'),
    path('slot/<int:pk>/', SlotView.as_view(), name='slot-detail'),
    path('slot/update/<int:pk>/', UpdateSlotView.as_view(), name='slot-update'),
    path('slot/delete/<int:pk>/', DeleteSlotView.as_view(), name='slot-delete'),
    path('slots/', GetAllSlotsView.as_view(), name='slots-list'),

    # other appointment-related urls can be added here
    path('appointment/create/', AppointmentView.as_view(), name='appointment-placeholder'),
    path('appointment/delete/<int:pk>/', DeleteAppointmentView.as_view(), name='appointment-delete'),
   
] 