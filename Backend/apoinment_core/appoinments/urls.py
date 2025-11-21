
 
from django.urls import path

from .views import DeleteSlotView, GetAllSlotsView, SlotView, UpdateSlotView



urlpatterns = [
    # path('admin/', "hello"),

    # slots api
    path('slot/create/', SlotView.as_view(), name='slot-create'),
    path('slot/<int:pk>/', SlotView.as_view(), name='slot-detail'),
    path('slot/update/<int:pk>/', UpdateSlotView.as_view(), name='slot-update'),
    path('slot/delete/<int:pk>/', DeleteSlotView.as_view(), name='slot-delete'),

    path('slots/', GetAllSlotsView.as_view(), name='slots-list'),
   
] 