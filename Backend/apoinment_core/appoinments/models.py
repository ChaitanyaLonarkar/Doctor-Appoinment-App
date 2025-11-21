from django.conf import settings
from django.db import models

from accounts.models import Userr
# from django.contrib.auth.models import User

class Slot(models.Model):
    doctor = models.ForeignKey(Userr, on_delete=models.CASCADE, limit_choices_to={'role': 'doctor'})
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.doctor.username}"

class Appointment(models.Model):
    slot = models.OneToOneField(Slot, on_delete=models.CASCADE)
    patient = models.ForeignKey(Userr, on_delete=models.CASCADE, limit_choices_to={'role': 'patient'})
    status = models.CharField(max_length=20, default="Booked")   # Booked / Visited
    def __str__(self):
        return f"{self.patient.username}"
