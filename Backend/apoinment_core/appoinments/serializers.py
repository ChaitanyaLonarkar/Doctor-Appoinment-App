from rest_framework import serializers
from .models import Slot, Appointment

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = "__all__"

class AppointmentSerializer(serializers.ModelSerializer):
    slot = SlotSerializer()

    class Meta:
        model = Appointment
        fields = "__all__"

    # def create(self, validated_data):
    #     slot_data = validated_data.pop('slot')
    #     slot = Slot.objects.create(**slot_data)
    #     appointment = Appointment.objects.create(slot=slot, **validated_data)
    #     return appointment