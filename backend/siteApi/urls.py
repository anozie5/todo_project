from django.urls import path
from siteApi.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path ('login/', LoginUser.as_view(), name = 'login'),
    path ('', CreateUser.as_view(), name = 'signup'),
    path ('todo/', Todos.as_view(), name = 'todos'),
    path ('todo/<int:pk>/', Todos.as_view(), name = 'todos'),
]
