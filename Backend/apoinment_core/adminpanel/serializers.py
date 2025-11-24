
from rest_framework import serializers
from appoinments.models import Slot, Appointment

class AdminAppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source="patient.username", read_only=True)
    doctor_name = serializers.CharField(source="slot.doctor.username", read_only=True)
    appointment_date = serializers.DateField(source="slot.date", read_only=True)
    start_time = serializers.TimeField(source="slot.start_time", read_only=True)
    end_time = serializers.TimeField(source="slot.end_time", read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id",
            "patient_name",
            "doctor_name",
            "appointment_date",
            "start_time",
            "end_time",
            "status",
        ]
