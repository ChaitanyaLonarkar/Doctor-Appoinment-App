# give code for permision role doctor and patient
from rest_framework import permissions
class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'doctor':
            return True
        return False
    
class IsPatient(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'patient':
            return True
        return False
    
class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'admin':
            return True
        return False