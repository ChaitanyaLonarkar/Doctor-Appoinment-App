# from django.db import models
# from django.contrib.auth.models import AbstractUser

# class User(AbstractUser):
#     ROLE_CHOICES = (
#         ('doctor', 'Doctor'),
#         ('patient', 'Patient'),
#         ('admin', 'Admin'),
#     )
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES)
#     specialization = models.CharField(max_length=100, blank=True, null=True)
#     phone = models.CharField(max_length=15, blank=True, null=True)
    

#     # def __str__(self):
#     #     return self.username