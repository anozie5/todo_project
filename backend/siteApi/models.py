from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

#user account model
class User (AbstractUser):
    profile_picture = models.ImageField (null = True, blank = True, upload_to='images')
    
    def __str__(self):
        return self.first_name
    
#todo model
class Todo (models.Model):
    title = models.ForeignKey (User, on_delete = models.CASCADE, max_length = 15)
    body = models.TextField ()
    date_created = models.DateField (auto_now_add = True)
    updated_on = models.DateTimeField (auto_now = True)

    def __str__(self):
        return self.title
    
