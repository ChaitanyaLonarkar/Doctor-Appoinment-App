# from django.db import models
# from accounts.models import Userr
# # Create your models here.

# class HospitalPDF(models.Model):
#     doctor = models.ForeignKey(Userr, on_delete=models.CASCADE , limit_choices_to={'role': 'doctor'})
#     pdf = models.FileField(upload_to="hospital_pdfs/")
#     uploaded_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.pdf.name + " - " + self.doctor.username
