from django.urls import path
from siteApi.views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', LoginUser.as_view(), name = 'login'),
    path('signup/', CreateUser.as_view(), name = 'signup'),
    path('todo/', Todos.as_view(), name = 'todos'),
    path('todo/<int:pk>/', Todos.as_view(), name = 'todos'),
]
