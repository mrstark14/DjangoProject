from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    enrollment_no = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    role_choices = [
        ('Admin', 'Admin'),
        ('Member', 'Member')
    ]
    password = models.CharField(null = True, blank = True, max_length=100)
    role = models.CharField(max_length=6, choices=role_choices, default='Member')
    class Meta:
        db_table = 'todo'
    