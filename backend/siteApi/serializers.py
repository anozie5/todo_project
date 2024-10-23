from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# serializer for user
# user creation
class UserCreationSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "username", "email", "password", "profile_picture"]
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 8}
        }
    
    def create(self, validated_data):
        user = super().create(validated_data)            
        user.set_password(validated_data['password']) # to hash password
        user.save()
        return(user)

# user login
class UserLoginSerializer (TokenObtainPairSerializer):
    username = serializers.CharField(required=True)

    #method over-riding to obtain JWT token from the TokenObtainPairSerializer for logging in user
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
    class Meta:
        model = User
        fields = ["username", "password"]

    #to validate user data
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                raise serializers.ValidationError('User with this username does not exist.')

            if not user.check_password(password):
                raise serializers.ValidationError('Incorrect password.')
            
            if not user.is_active: #just to check for inactive user
                raise serializers.ValidationError('User account is inactive.')

            attrs['user'] = user
        else:
            raise serializers.ValidationError('Both email and password are required.')

        return attrs

# serializer for todo
class TodoSerializer (serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
        exclude = ["date_created", "user"]
        extra_kwargs = {
            'updated_on': {'read_only': True}
        }