import logging
from django.shortcuts import render
from siteApi.models import *
from siteApi.serializers import *
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.

logger = logging.getLogger(__name__)
#user creation
class CreateUser (APIView):
    permission_classes = [AllowAny]

    def get (self, request):
        users = User.objects.all()
        use = UserCreationSerializer (users, many = True)
        return Response (use.data, status = status.HTTP_200_OK)
     
    def post(self, request):
        new_user = UserCreationSerializer(data = request.data)
        if new_user.is_valid():
            newuser = new_user.save()
            logger.info(f"User {newuser.username} created successfully.")
        else:
            logger.warning(f"User creation failed: {new_user.errors}")
        return Response(new_user.errors, status=status.HTTP_400_BAD_REQUEST)


    
#user login
class LoginUser (APIView):
    permission_classes = [AllowAny]

    def post (self, request):
        users = UserLoginSerializer (data = request.data)
        if not users.is_valid():
            return Response(users.errors, status=status.HTTP_400_BAD_REQUEST)
        username = users.validated_data.get("username")
        password = users.validated_data.get("password")
        if not username or not password:
            return Response ("Please provide all required fields", status = status.HTTP_400_BAD_REQUEST)
        user = authenticate(request, username = username, password = password)
        if user is not None:
            try:
                refresh_token = RefreshToken.for_user(user)
                return Response({
                    "refresh": str(refresh_token),
                    "access": str(refresh_token.access_token),
                    "message": "Login successful",
                }, status=status.HTTP_200_OK)
            except Exception as e:
                logger.warning(f"Error generating tokens for user {username}: {str(e)}", exc_info=True)
                return Response({"detail": "Error generating tokens."}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"detail": "Invalid username or password."}, status = status.HTTP_401_UNAUTHORIZED)
    
    
#todo
class Todos (APIView):
    authentication_classes = [JWTAuthentication]
    
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
