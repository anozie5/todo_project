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
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.
#user creation
class CreateUser (APIView):
    def get (self, request):
        users = User.objects.all()
        use = UserCreationSerializer (users, many = True)
        return Response (use.data, status = status.HTTP_200_OK)
     
    def post (self, request):
        new_user = UserCreationSerializer (data = request.data)
        if new_user.is_valid():
                new_user.save()
                refresh = RefreshToken.for_user(new_user)
                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    }, "New user created", status=status.HTTP_201_CREATED)
        return Response(new_user.errors, status = status.HTTP_400_BAD_REQUEST)

    
#user login
class LoginUser (APIView):
    def post (self, request):
        user = UserLoginSerializer (data = request.data)
        if not user.is_valid():
            return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
        username = user.validated_data.get("username")
        password = user.validated_data.get("password")
        if not username and not password:
            return Response ("Please provide all required fields", status.HTTP_400_BAD_REQUEST)
        user = authenticate(request, username = username, password = password)
        if user is not None:
            refresh_token = RefreshToken.for_user(user)
#            refresh_token.set_exp(lifetime = timedelta(hours = 1))
            return Response({
                "refresh": str(refresh_token),
                "access": str(refresh_token.access_token),
            }, status = status.HTTP_200_OK)
        return Response(user.errors, status = status.HTTP_400_BAD_REQUEST)
    
    
#todo
class Todos (APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get (self, request, pk):
        if pk != None:
            tos = Todo.objects.get (pk = pk)
            todo = TodoSerializer (instance = tos)
            return Response (todo.data, status = status.HTTP_200_OK)
        elif pk == None:
            tos = Todo.objects.all()
            todo = TodoSerializer (tos, many = True)
            return Response (todo.data, status = status.HTTP_200_OK)
        return Response(todo.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def post (self, request):
        todo = TodoSerializer (request.data)
        if todo.is_valid():
            todo.save()
            return Response ('Todo created', status = status.HTTP_200_OK)
        return Response(todo.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def put (self, request, pk):
        tos = Todo.objects.get (pk = pk)
        todo = TodoSerializer (request.data, instance = tos)
        if todo.is_valid():
            todo.save()
            return Response ('Todo updated', status = status.HTTP_200_OK)
        return Response(todo.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def delete (self, request, pk):
        if pk != None:
            tos = Todo.objects.get (pk = pk)
            todo = TodoSerializer (request.data, instance = tos)
            todo.delete()
            return Response (status = status.HTTP_200_OK)
        elif pk == None:
            todo = TodoSerializer (request.data)
            todo.delete()
            return Response (status = status.HTTP_200_OK)
        return Response(todo.errors, status = status.HTTP_400_BAD_REQUEST)
