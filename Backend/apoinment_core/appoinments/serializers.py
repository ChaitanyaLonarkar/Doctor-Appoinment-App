from rest_framework import serializers
from .models import Slot, Appointment
from accounts.models import Userr

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userr
        fields = ['user']

class SlotSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Slot
        fields = "__all__"



class SlotidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ['id']

class AppointmentSerializer(serializers.ModelSerializer):
    # slot = SlotidSerializer()

    class Meta:
        model = Appointment
        fields = ['slot', 'patient', 'status',]

    # def create(self, validated_data):
    #     slot = validated_data['slot']
    #     print("slot data", slot)
    #     appointment = Appointment.objects.create(slot=slot, **validated_data)
    #     return appointment


class GetAllDoctorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userr
        fields = ['id', 'username', 'email', 'specialization', 'role']




class PatienttSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userr
        fields = ['id', 'username', 'email']

class SlottSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ['id', 'date', 'start_time', 'end_time', 'is_booked']

class AppointmenttSerializer(serializers.ModelSerializer):
    patient = PatienttSerializer()
    slot = SlottSerializer()

    class Meta:
        model = Appointment
        fields = ['id', 'slot', 'patient', 'status']


# serializers.py
from rest_framework import serializers
from .models import Appointment, Slot, Userr

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userr
        fields = ['id', 'username', 'email']

class SlotwithDoctorSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer()

    class Meta:
        model = Slot
        fields = ['id', 'date', 'start_time', 'end_time', 'doctor', 'is_booked']

class AppointmentwithSlotSerializer(serializers.ModelSerializer):
    slot = SlotwithDoctorSerializer()

    class Meta:
        model = Appointment
        fields = ['id', 'slot', 'status']
