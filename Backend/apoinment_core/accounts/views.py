from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
# from django.contrib.auth.models import User
from accounts.serializers import RegisterDoctorSerializer, RegisterPatientSerializer
from accounts.models import Userr

class RegisterDoctor(APIView):
    def post(self, request):
        data = request.data.copy()
        data['role'] = 'doctor'
        print("dara",data)
        serializer = RegisterDoctorSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg":"Doctor registered"}, status=201)
        # return Response({"msg":"Doctor registered"}, status=201)
        return Response(serializer.errors, status=400)

class RegisterPatient(APIView):
    def post(self, request):
        data = request.data.copy()
        data['role'] = 'patient'
        serializer = RegisterPatientSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            
            return Response({"msg":"Patient registered"}, status=201)   
        # return Response({"msg":"Doctor registered"}, status=201)
        return Response({"msg":serializer.errors}, status=400)
    
class Login(APIView):
    def post(self, request):
        data = request.data.copy()
        username = data.get('username')

        password = data.get('password')

        # username = "chetan"
        # password = "123456"
        print('username',username)
        print(password,"dsfasdfasdf")
   

        try:
            user = Userr.objects.get(username=username)
                 
            print(user,"user")

        except Userr.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND, data={"msg": ("Invalid email or password.")})
      
        # if not user.is_active:
        #     return Response({"msg": ("Your account is inactive. Please contact admin.")})
        if not user.check_password(password):
            return Response(status=status.HTTP_404_NOT_FOUND, data={"msg": ("Invalid email or password.")})

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'msg':    "Login successful",
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': user.role,
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({"msg":"Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"msg":"Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"msg":"Bad request"}, status=status.HTTP_400_BAD_REQUEST)