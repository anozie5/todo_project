from datetime import timedelta
from django.shortcuts import render
from siteApi.models import *
from siteApi.serializers import *
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

# Create your views here.
#user creation
class CreateUser (APIView):
    def post (self, request):
        new_user = UserCreationSerializer (request.data)
        if new_user.is_valid():
                new_user.save()
                refresh = RefreshToken.for_user(new_user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    }, status=status.HTTP_201_CREATED)
        return Response(new_user.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def get (self, request):
        users = User.objects.all()
        use = UserCreationSerializer (users, many = True)
        return Response (use.data, status = status.HTTP_200_OK)
    
#user login
class LoginUser (APIView):
    def post (self, request):
        user = UserCreationSerializer (request.data)
        email = user.validated_data.get('email')
        password = user.validated_data.get('password')
        if not email and not password:
            return Response ('Please provide all required fields', status.HTTP_400_BAD_REQUEST)
        user = authenticate(email = email, password = password)
        if user.is_valid():
            refresh_token = RefreshToken.for_user(user.validated_data)
            refresh_token.set_exp(lifetime = timedelta(hours = 1))
            return Response({
                'refresh': str(refresh_token),
                'access': str(refresh_token.access_token),
            }, status = status.HTTP_200_OK)
        return Response(user.errors, status = status.HTTP_400_BAD_REQUEST)