from rest_framework import serializers
from .models import Slot, Appointment

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