from django.urls import path
from siteApi.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path ('', LoginUser.as_view(), name = 'login'),
    path ('signup/', CreateUser.as_view(), name = 'signup'),
    path ('todo/', Todos.as_view(), name = 'todos'),
]
