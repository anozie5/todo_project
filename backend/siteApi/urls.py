from django.urls import path
from siteApi.views import *

urlpatterns = [
    path ('', LoginUser.as_view(), name = 'login'),
    path ('signup/', CreateUser.as_view(), name = 'signup'),
    path ('todo/', Todos.as_view(), name = 'todos'),
    path ('todo/<int:pk>/', Todos.as_view(), name = 'todos'),
]
