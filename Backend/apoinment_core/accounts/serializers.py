from rest_framework import serializers
from accounts.models import Userr

class RegisterPatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userr
        fields = ['username','email','password','phone']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = Userr.objects.create_user(**validated_data)
        return user
    
class RegisterDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userr
        fields = ['username','email','password','specialization']
        extra_kwargs = {"password": {"write_only": True}}   

    def create(self, validated_data):
        user = Userr.objects.create_user(**validated_data)
        return user
    