from rest_framework import serializers
from siteApi.models import *

# serializer for user
# user creation
class UserCreationSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "username", "email", "password", "profile_picture"]
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 8}
        }

# user login
class UserLoginSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]

# serializer for todo
class TodoSerializer (serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
        exclude = ["date_created"]
        extra_kwargs = {
            'updated_on': {'read_only': True}
        }