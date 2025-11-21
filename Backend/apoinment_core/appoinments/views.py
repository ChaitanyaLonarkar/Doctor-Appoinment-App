from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Userr

from .models import Appointment, Slot
from .serializers import AppointmentSerializer, SlotSerializer


class AppointmentView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def get(self, request, appointment_id):
        appointment = Appointment.objects.get(id=appointment_id)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UpdateAppointmentView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def put(self, request, appointment_id):
        appointment = Appointment.objects.get(id=appointment_id)
        serializer = AppointmentSerializer(appointment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteAppointmentView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def delete(self, request, appointment_id):
        appointment = Appointment.objects.get(id=appointment_id)
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GetAllAppointmentsView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def get(self, request):
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)
    
class SlotView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def get(self, request, pk):
        slot = Slot.objects.get(id=pk)
        serializer = SlotSerializer(slot)
        return Response(serializer.data)

    def post(self, request):
        doctor= request.data.get('doctor')
        doctor_id=Userr.objects.get(id=doctor)
        print("dpc",doctor)

        serializer = SlotSerializer( data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateSlotView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def put(self, request, pk):
        slot = Slot.objects.get(id=pk)
        serializer = SlotSerializer(slot, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteSlotView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def delete(self, request, pk):
        slot = Slot.objects.get(id=pk)
        slot.delete()
        return Response({"msg":"slot deleted "},status=status.HTTP_204_NO_CONTENT)
    
class GetAllSlotsView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def get(self, request):
        slots = Slot.objects.all()
        serializer = SlotSerializer(slots, many=True)
        return Response(serializer.data)
    
class GetAppointmentsByDoctorView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def get(self, request, doctor_id):
        appointments = Appointment.objects.filter(doctor=doctor_id)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)
class GetAppointmentsByPatientView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def get(self, request, patient_id):
        appointments = Appointment.objects.filter(patient=patient_id)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

class GetAppointmentsByStatusView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def get(self, request, status):
        appointments = Appointment.objects.filter(status=status)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

class GetAppointmentsByDateView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def get(self, request, date):
        appointments = Appointment.objects.filter(date=date)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

