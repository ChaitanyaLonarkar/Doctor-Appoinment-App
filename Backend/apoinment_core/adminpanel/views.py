from django.shortcuts import render

# Create your views here.
# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from appoinments.models import Appointment
from .serializers import AdminAppointmentSerializer

class AdminAppointmentListView(APIView):
    permission_classes = [permissions.IsAdminUser]   # Only admin can access

    def get(self, request):
        appointments = Appointment.objects.select_related("slot", "patient", "slot__doctor").all().order_by("slot__date", "slot__start_time")
        serializer = AdminAppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
