from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Userr

from .models import Appointment, Slot
from .serializers import AppointmentSerializer, AppointmentwithSlotSerializer, GetAllDoctorListSerializer, SlotSerializer


class AppointmentView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def get(self, request, appointment_id):
        appointment = Appointment.objects.get(id=appointment_id)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)
    
    def post(self, request):


        serializer = AppointmentSerializer(data=request.data)
        slot_id = request.data['slot']
        slot=Slot.objects.get(id=slot_id)
        print("slot",slot)
        if serializer.is_valid():
            slot.is_booked = True
            slot.save()
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
    def delete(self, request, pk):
        appointment = Appointment.objects.get(id=pk)
        appointment.delete()
        return Response({"msg":"slot deleted "},status=status.HTTP_204_NO_CONTENT)


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

# New endpoint: Get slots for a specific doctor
class GetDoctorSlotsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        slots = Slot.objects.filter(doctor=id)
        serializer = SlotSerializer(slots, many=True)
        return Response(serializer.data)

# New endpoint: Get appointments for a specific doctor
class GetDoctorAppointmentsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, doctor_id):
        # Get all slots for this doctor
        doctor_slots = Slot.objects.filter(doctor=doctor_id)
        # Get appointments for these slots
        appointments = Appointment.objects.filter(slot__in=doctor_slots)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

# New endpoint: Update appointment status (Booked -> Visited)
class UpdateAppointmentStatusView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, appointment_id):
        try:
            appointment = Appointment.objects.get(id=appointment_id)
            new_status = request.data.get('status')
            
            if new_status not in ['Booked', 'Visited']:
                return Response({"msg": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)
            
            appointment.status = new_status
            appointment.save()
            serializer = AppointmentSerializer(appointment)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Appointment.DoesNotExist:
            return Response({"msg": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)
    
class GetAppointmentsByDoctorView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def get(self, request, doctor_id):
        appointments = Appointment.objects.filter(doctor=doctor_id)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)
class GetAppointmentsByPatientView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def get(self, request, id):
        appointments = Appointment.objects.filter(patient=id)
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



# get all doctor list view
class GetAllDoctorListView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def get(self, request):
        doctors = Userr.objects.filter(role='doctor')
        serializer = GetAllDoctorListSerializer(doctors, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    

# get all slots of particular doctor that is booked

class GetDoctorBookedSlotsView(APIView):
    permission_classes = [AllowAny, IsAuthenticated]
    def get(self, request, id):
        booked_slots = Slot.objects.filter(is_booked=True, doctor=id)
        serializer = SlotSerializer(booked_slots, many=True)
        if not booked_slots:
            return Response({"msg":"No booked slots found for this doctor"},status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.data,status=status.HTTP_200_OK)
    


# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Appointment
from .serializers import AppointmenttSerializer
# from .permissions import IsDoctor

class DoctorAppointmentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        doctor = request.user

        appointments = Appointment.objects.filter(slot__doctor=doctor).select_related(
            "slot", "patient"
        )

        serializer = AppointmenttSerializer(appointments, many=True)

        return Response({
            "doctor": doctor.username,
            "appointments_count": appointments.count(),
            "appointments": serializer.data
        })

class UpdateAppointmentStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            appointment = Appointment.objects.get(id=pk, slot__doctor=request.user)
        except Appointment.DoesNotExist:
            return Response({"error": "Not allowed"}, status=403)

        appointment.status = request.data.get("status", appointment.status)
        appointment.save()

        return Response({"message": "Status updated successfully"})


# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Appointment
from .serializers import AppointmentSerializer
from .permissions import IsPatient

class PatientAppointmentsView(APIView):
    permission_classes = [IsAuthenticated, IsPatient]

    def get(self, request):
        patient = request.user

        # All appointments booked by this patient
        appointments = Appointment.objects.filter(
            patient=patient
        ).select_related("slot", "slot__doctor")

        serializer = AppointmentwithSlotSerializer(appointments, many=True)

        return Response({
            "patient": patient.username,
            "appointments_count": appointments.count(),
            "appointments": serializer.data
        })
