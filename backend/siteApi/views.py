from django.shortcuts import render
from siteApi.models import *
from siteApi.serializers import *
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView 
from rest_framework_simplejwt.authentication import JWTAuthentication


# Create your views here.
#user creation
class CreateUser (generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreationSerializer

    permission_classes = [AllowAny]

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Validate incoming data
        user = serializer.save()  # Call create method in the serializer

        # Generate tokens for the new user
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': serializer.data  # Include user data in the response
        }, status=status.HTTP_201_CREATED)

    
#user login
class LoginUser (TokenObtainPairView):
    serializer_class = UserLoginSerializer

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Get the user object from the validated data
        user = serializer.validated_data['user']
        
        # Generate tokens for the user
        refresh = RefreshToken.for_user(user)
        
        # Serialize user data (e.g., using another serializer or manual serialization)
        user_data = {
            'username': user.username,
            'email': user.email,
        }

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': user_data  # Return serialized user data instead of the object itself
        }, status = status.HTTP_200_OK)
    
    
#todo
class Todos (APIView):
    authentication_classes = [JWTAuthentication]
    
    def get (self, request, pk):
        if pk != None:
            tos = Todo.objects.get(pk = pk)
            todo = TodoSerializer(instance = tos)
            return Response(todo.data, status = status.HTTP_200_OK)
        elif pk == None:
            tos = Todo.objects.all()
            todo = TodoSerializer(tos, many = True)
            return Response(todo.data, status = status.HTTP_200_OK)
        return Response(todo.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def post (self, request):
        todo = TodoSerializer(request.data)
        if todo.is_valid():
            todo.save()
            return Response('Todo created', status = status.HTTP_200_OK)
        return Response(todo.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def put (self, request, pk):
        tos = Todo.objects.get(pk = pk)
        todo = TodoSerializer(request.data, instance = tos)
        if todo.is_valid():
            todo.save()
            return Response('Todo updated', status = status.HTTP_200_OK)
        return Response(todo.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def delete (self, request, pk):
        if pk != None:
            tos = Todo.objects.get(pk = pk)
            tos.delete()
            return Response(status = status.HTTP_200_OK)
        elif pk == None:
            tos = Todo.objects.all()
            tos.delete()
            return Response(status = status.HTTP_200_OK)
        return Response('Cannot delete', status = status.HTTP_400_BAD_REQUEST)
